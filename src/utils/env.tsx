import {popup} from "./utils"
/*******************
 * 環境変数
 */
/**
 * firebase
 */
export const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY || process.env.NEXT_PUBLIC_FIREBASE_API_KEY
// check
if(!FIREBASE_API_KEY){
    popup("FIREBASE_API_KEY is empty. Check to make sure that environment variables are set correctly in the .env.local file and in other predetermined places.");
}
export const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN || process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
export const FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET || process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
export const FIREBASE_MESSAGEING_SENDER_ID = process.env.FIREBASE_MESSAGEING_SENDER_ID || process.env.NEXT_PUBLIC_FIREBASE_MESSAGEING_SENDER_ID
export const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID || process.env.NEXT_PUBLIC_FIREBASE_APP_ID
