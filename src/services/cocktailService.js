import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  writeBatch
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase';
import { INITIAL_COCKTAILS, ALCOHOL_CATEGORIES } from '../data/initialCocktails';

const LOCAL_STORAGE_KEY = 'coctail_recipes_v2';
const CATEGORIES_STORAGE_KEY = 'coctail_categories_v1';

// Seed initial cocktails if firestore collection is empty
async function seedInitialDataIfEmpty() {
  if (!db) return;
  try {
    const snapshot = await getDocs(collection(db, 'cocktails'));
    if (snapshot.empty) {
      console.log('Firestore boş, başlangıç tarifleri yükleniyor...');
      const batch = writeBatch(db);
      INITIAL_COCKTAILS.forEach((cocktail) => {
        const docRef = doc(db, 'cocktails', cocktail.id);
        batch.set(docRef, { ...cocktail, createdAt: Date.now() });
      });
      await batch.commit();
      console.log('Başlangıç tarifleri Firestore\'a yüklendi!');
    }
  } catch (error) {
    console.warn('Seed data error:', error);
  }
}

// ----------------------------------------------------
// COCKTAILS: Real-time listener
// ----------------------------------------------------
export function subscribeCocktails(onUpdate) {
  if (isFirebaseConfigured() && db) {
    seedInitialDataIfEmpty();
    const unsubscribe = onSnapshot(
      collection(db, 'cocktails'),
      (snapshot) => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data()
          }));
          // Sort by creation or name
          list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
          onUpdate(list, true); // true = connected to Firebase
        } else {
          onUpdate(INITIAL_COCKTAILS, true);
        }
      },
      (error) => {
        console.error('Firestore listener error:', error);
        // Fallback to local storage on error
        const local = loadLocalCocktails();
        onUpdate(local, false);
      }
    );
    return unsubscribe;
  } else {
    // Firebase not configured yet, use localStorage
    const local = loadLocalCocktails();
    onUpdate(local, false); // false = local mode
    return () => {};
  }
}

// Save or Update Cocktail
export async function saveCocktail(cocktailData) {
  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, 'cocktails', cocktailData.id);
      await setDoc(docRef, {
        ...cocktailData,
        updatedAt: Date.now(),
        createdAt: cocktailData.createdAt || Date.now()
      });
      return true;
    } catch (error) {
      console.error('Firebase save error:', error);
      throw error;
    }
  } else {
    // LocalStorage fallback
    const list = loadLocalCocktails();
    const idx = list.findIndex((c) => c.id === cocktailData.id);
    let updated;
    if (idx >= 0) {
      updated = [...list];
      updated[idx] = cocktailData;
    } else {
      updated = [cocktailData, ...list];
    }
    saveLocalCocktails(updated);
    return true;
  }
}

// Delete Cocktail
export async function deleteCocktail(cocktailId) {
  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, 'cocktails', cocktailId);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error('Firebase delete error:', error);
      throw error;
    }
  } else {
    const list = loadLocalCocktails();
    const updated = list.filter((c) => c.id !== cocktailId);
    saveLocalCocktails(updated);
    return true;
  }
}

// ----------------------------------------------------
// CATEGORIES: Real-time listener
// ----------------------------------------------------
export function subscribeCategories(onUpdate) {
  if (isFirebaseConfigured() && db) {
    const unsubscribe = onSnapshot(
      collection(db, 'categories'),
      (snapshot) => {
        const customCategories = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
          isCustom: true
        }));
        // Merge initial 7 categories with custom categories
        const merged = [...ALCOHOL_CATEGORIES, ...customCategories];
        onUpdate(merged);
      },
      (error) => {
        console.error('Firestore categories error:', error);
        onUpdate(loadLocalCategories());
      }
    );
    return unsubscribe;
  } else {
    onUpdate(loadLocalCategories());
    return () => {};
  }
}

// Save Custom Category
export async function saveCategory(categoryData) {
  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, 'categories', categoryData.id);
      await setDoc(docRef, {
        name: categoryData.name,
        emoji: categoryData.emoji,
        createdAt: Date.now()
      });
      return true;
    } catch (error) {
      console.error('Firebase category save error:', error);
      throw error;
    }
  } else {
    const current = loadLocalCategories();
    saveLocalCategories([...current, categoryData]);
    return true;
  }
}

// Delete Custom Category
export async function deleteCategory(categoryId) {
  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, 'categories', categoryId);
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error('Firebase category delete error:', error);
      throw error;
    }
  } else {
    const current = loadLocalCategories();
    saveLocalCategories(current.filter((c) => c.id !== categoryId));
    return true;
  }
}

// ----------------------------------------------------
// Local Storage Helpers (Fallback)
// ----------------------------------------------------
function loadLocalCocktails() {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return INITIAL_COCKTAILS;
}

function saveLocalCocktails(data) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
}

function loadLocalCategories() {
  try {
    const saved = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return ALCOHOL_CATEGORIES;
}

function saveLocalCategories(data) {
  try {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
}
