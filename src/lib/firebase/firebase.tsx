import {
    FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, 
    FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGEING_SENDER_ID, FIREBASE_APP_ID
        } from '@/utils/env';
import { getApps, getApp, initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
export const firebaseConfig:Object = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGEING_SENDER_ID,
    appId: FIREBASE_APP_ID
};

export const initializeFirebaseApp = () => {
    return !getApps().length ? initializeApp(firebaseConfig) : getApp()
}