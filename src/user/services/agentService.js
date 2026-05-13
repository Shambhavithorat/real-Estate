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

const COLLECTION_NAME = 'agents'; // We'll use 'agents' as the collection name

export const agentService = {
  // Real-time listener for all agents
  subscribeAgents: (callback) => {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const agents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(agents);
    }, (error) => {
      console.error('Error in agent listener: ', error);
    });
  },

  // Get all agents
  getAllAgents: async () => {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching agents: ', error);
      throw error;
    }
  },

  // Add a new agent
  addAgent: async (agentData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...agentData,
        createdAt: new Date().toISOString(),
        status: agentData.status || 'Active'
      });
      return { id: docRef.id, ...agentData };
    } catch (error) {
      console.error('Error adding agent: ', error);
      throw error;
    }
  },

  // Update an existing agent
  updateAgent: async (id, agentData) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, { ...agentData, updatedAt: new Date().toISOString() });
    } catch (error) {
      console.error('Error updating agent: ', error);
      throw error;
    }
  },

  // Update agent status (Active/Suspended)
  updateAgentStatus: async (id, status) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, { status });
    } catch (error) {
      console.error('Error updating agent status: ', error);
      throw error;
    }
  },

  // Verify an agent
  verifyAgent: async (id, verified) => {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, { verified });
    } catch (error) {
      console.error('Error verifying agent: ', error);
      throw error;
    }
  }
};
