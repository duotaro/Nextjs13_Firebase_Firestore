'use client'
import { useEffect } from 'react';
import styles from './page.module.css'
import Link from 'next/link';
import { useFirebaseContext, SET_USER, SET_FIREBASE_APP, SET_FIREBASE_AUTH, SET_LOADING, SET_FIRESTORE } from '@/context/firebase.context';
import { FirebaseAuth, csvToArray } from '@/utils/inputData';
import {initializeFirebaseApp} from '../lib/firebase/firebase'
import { popup, errorMessage} from '@/utils/utils';
import { setDocument, COLLECTION_NAME, Member} from '@/lib/firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseApp } from 'firebase/app';

export default async function Home() {
  const { state, dispatch } = useFirebaseContext()
  const signOut = () => {
    dispatch({type: SET_USER, value: null})
    popup("ログアウトしました。")
  }


  useEffect(() => {
    const firebase:FirebaseApp = state.firebase || initializeFirebaseApp();
    const auth = state.firebaseAuth || getAuth(firebase);
    const db = state.firestore || getFirestore(firebase);

    const adminEmailAddress = process.env.NEXT_PUBLIC_ADMIN_EMAIL_ADDRESS || ''
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || ''


    // ログインしちゃう
    signInWithEmailAndPassword(auth, adminEmailAddress, adminPassword).then((res) => {
      // csvから取得してfirestoreに登録
      csvToArray().then((list:Array<FirebaseAuth>)=> {
        console.log(list)
        for(const user of list) {
          setMember(user).then(() => {
            console.log(user.displayName + "の登録完了！！")
          })
        }
      })
    })

    

    const setMember = async (user:FirebaseAuth) => {
      const menber:Member = {
        id: user.localId,
        name: user.displayName || '',
        photoURL: '',
        isParticipation: false,
        answered: false
      }
      await setDocument(db, COLLECTION_NAME.MEMBERS, user.localId, menber)
    }


  }, []);


  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          {!state || !state.user && (
            <>
            <Link href="/signup">新規登録</Link>
            <Link href="/signin">ログイン</Link>
            </>
          )}
          {state && state.user && (
            <>
            <div className='row'>
              {state.user.displayName}({state.user.email})でログイン中です。
            </div>
            <div className='row'>
              <button type="submit" className="btn btn-primary" onClick={signOut}>サインアウト</button>
            </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}