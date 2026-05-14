import { db } from '../../shared/firebase/firebaseConfig';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';

const INQUIRIES_COLLECTION = 'inquiries';

export const inquiryService = {
  // Create a new inquiry (used by Sell page or contact forms)
  addInquiry: async (inquiryData) => {
    try {
      const docRef = await addDoc(collection(db, INQUIRIES_COLLECTION), {
        ...inquiryData,
        status: 'New',
        createdAt: new Date().toISOString(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error adding inquiry:", error);
      throw error;
    }
  },

  // Get all inquiries (used by Admin)
  getInquiries: async () => {
    try {
      const q = query(collection(db, INQUIRIES_COLLECTION), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      throw error;
    }
  },

  // Real-time subscription for inquiries
  subscribeInquiries: (callback) => {
    const q = query(collection(db, INQUIRIES_COLLECTION), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(data);
    });
  },

  // Update inquiry status
  updateInquiryStatus: async (id, status) => {
    try {
      const docRef = doc(db, INQUIRIES_COLLECTION, id);
      await updateDoc(docRef, { status });
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  },

  // Delete inquiry
  deleteInquiry: async (id) => {
    try {
      await deleteDoc(doc(db, INQUIRIES_COLLECTION, id));
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      throw error;
    }
  }
};
