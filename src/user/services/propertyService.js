import { db } from '../../shared/firebase/firebaseConfig';
import { 
  collection, 
  onSnapshot, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc,
  deleteDoc,
  query, 
  where,
  orderBy,
  limit 
} from 'firebase/firestore';

const COLLECTION_NAME = 'properties';

export const propertyService = {
  // Real-time listener for this specific collection
  subscribeProperties: (callback) => {
    const q = query(collection(db, COLLECTION_NAME));
    return onSnapshot(q, (snapshot) => {
      const properties = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(properties);
    }, (error) => {
      console.error('Error in real-time listener: ', error);
    });
  },

  // Get all properties from this collection
  getAllProperties: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching properties: ', error);
      throw error;
    }
  },

  // Get a single property by ID
  getPropertyById: async (id) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error('Property not found');
      }
    } catch (error) {
      console.error('Error fetching property: ', error);
      throw error;
    }
  },

  // Add a new property to this collection
  addProperty: async (propertyData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...propertyData,
        createdAt: new Date().toISOString()
      });
      return { id: docRef.id, ...propertyData };
    } catch (error) {
      console.error('Error adding property: ', error);
      throw error;
    }
  },

  // Update an existing property
  updateProperty: async (id, propertyData) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const { id: _, ...dataToUpdate } = propertyData; // Remove ID if present in data
      await updateDoc(docRef, { ...dataToUpdate, updatedAt: new Date().toISOString() });
    } catch (error) {
      console.error('Error updating property: ', error);
      throw error;
    }
  },

  // Delete a property
  deleteProperty: async (id) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting property: ', error);
      throw error;
    }
  }
};

export default propertyService;
