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
import { db } from '../../shared/firebase/firebaseConfig';

const COLLECTION_NAME = 'users';

export const userService = {
  // Real-time listener for all users
  subscribeUsers: (callback) => {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(users);
    }, (error) => {
      console.error('Error in user listener: ', error);
    });
  },

  // Real-time listener for brokers
  subscribeBrokers: (callback) => {
    const q = query(collection(db, COLLECTION_NAME), where('role', '==', 'broker'));
    return onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(users);
    }, (error) => {
      console.error('Error in broker listener: ', error);
    });
  },

  // Delete a user (broker)
  deleteUser: async (id) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting user: ', error);
      throw error;
    }
  },

  // Get all users
  getAllUsers: async () => {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching users: ', error);
      throw error;
    }
  },

  // Update user status (Active/Blocked)
  updateUserStatus: async (id, status) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, { status });
    } catch (error) {
      console.error('Error updating user status: ', error);
      throw error;
    }
  },

  // Update user role
  updateUserRole: async (id, role) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, { role });
    } catch (error) {
      console.error('Error updating user role: ', error);
      throw error;
    }
  }
};
