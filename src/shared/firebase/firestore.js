import { 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where 
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export { db };

const COLLECTION_NAME = 'properties';

export const propertyService = {
  // Get all properties
  async getAllProperties() {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  // Get property by ID
  async getPropertyById(id) {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  },

  // Add new property
  async addProperty(propertyData) {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...propertyData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return docRef.id;
  },

  // Update property
  async updateProperty(id, propertyData) {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...propertyData,
      updatedAt: new Date().toISOString()
    });
  },

  // Delete property
  async deleteProperty(id) {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  },

  // Get properties by broker
  async getPropertiesByBroker(brokerId) {
    const q = query(collection(db, COLLECTION_NAME), where("brokerId", "==", brokerId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};
