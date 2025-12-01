import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, get } from 'firebase/database';
import { GameState, Member, AccessLog } from './types';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSKxaIvU3EJYYD4P9rikrn4T3NTM82Zz8",
  authDomain: "collective-intelligence-jjh.firebaseapp.com",
  databaseURL: "https://collective-intelligence-jjh-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "collective-intelligence-jjh",
  storageBucket: "collective-intelligence-jjh.firebasestorage.app",
  messagingSenderId: "940729633848",
  appId: "1:940729633848:web:8bec843c599a5467562acd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Database references
const gamesRef = ref(database, 'games');
const membersRef = ref(database, 'members');
const logsRef = ref(database, 'logs');

// --- GAMES ---
export const subscribeToGames = (callback: (games: GameState[]) => void) => {
  return onValue(gamesRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      callback(data);
    } else {
      callback([]);
    }
  });
};

export const saveGames = async (games: GameState[]) => {
  try {
    await set(gamesRef, games);
  } catch (error) {
    console.error('Failed to save games to Firebase:', error);
  }
};

export const getGames = async (): Promise<GameState[]> => {
  try {
    const snapshot = await get(gamesRef);
    return snapshot.val() || [];
  } catch (error) {
    console.error('Failed to get games from Firebase:', error);
    return [];
  }
};

// --- MEMBERS ---
export const subscribeToMembers = (callback: (members: Member[]) => void) => {
  return onValue(membersRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      callback(data);
    } else {
      callback([]);
    }
  });
};

export const saveMembers = async (members: Member[]) => {
  try {
    await set(membersRef, members);
  } catch (error) {
    console.error('Failed to save members to Firebase:', error);
  }
};

export const getMembers = async (): Promise<Member[]> => {
  try {
    const snapshot = await get(membersRef);
    return snapshot.val() || [];
  } catch (error) {
    console.error('Failed to get members from Firebase:', error);
    return [];
  }
};

// --- LOGS ---
export const subscribeToLogs = (callback: (logs: AccessLog[]) => void) => {
  return onValue(logsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      callback(data);
    } else {
      callback([]);
    }
  });
};

export const saveLogs = async (logs: AccessLog[]) => {
  try {
    await set(logsRef, logs);
  } catch (error) {
    console.error('Failed to save logs to Firebase:', error);
  }
};

export const getLogs = async (): Promise<AccessLog[]> => {
  try {
    const snapshot = await get(logsRef);
    return snapshot.val() || [];
  } catch (error) {
    console.error('Failed to get logs from Firebase:', error);
    return [];
  }
};

// Check if Firebase is configured
export const isFirebaseConfigured = (): boolean => {
  return firebaseConfig.apiKey !== "YOUR_API_KEY";
};

export { database };
