'use client'
import { useEffect } from 'react';
import styles from '../page.module.css'
import Link from 'next/link';
import { useFirebaseContext, SET_USER, SET_FIREBASE_APP, SET_FIREBASE_AUTH, SET_LOADING, SET_FIRESTORE } from '@/context/firebase.context';
import { FirebaseAuth, csvToArray } from '@/utils/inputData';
import {initializeFirebaseApp} from '../../lib/firebase/firebase'
import { popup, errorMessage} from '@/utils/utils';
import { setDocument, COLLECTION_NAME, Member} from '@/lib/firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseApp } from 'firebase/app';

/**
 * firestoreにデータを投入します。
 * 特定のユーザーのみ投入可能
 * @returns 
 */
export default async function Admin() {
  const { state, dispatch } = useFirebaseContext()


  useEffect(() => {



  }, []);

  const doRegistFirestore = () => {
    
    const firebase:FirebaseApp = state.firebase || initializeFirebaseApp();
    const auth = state.firebaseAuth || getAuth(firebase);
    const db = state.firestore || getFirestore(firebase);

  
    // 環境変数で定義
    const adminEmailAddress = process.env.NEXT_PUBLIC_ADMIN_EMAIL_ADDRESS || ''
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || ''

    // loading
    dispatch({type: SET_LOADING, value: true})
    // ログインしちゃう
    signInWithEmailAndPassword(auth, adminEmailAddress, adminPassword).then((res) => {
      // csvから取得してfirestoreに登録
      csvToArray().then((list:Array<FirebaseAuth>)=> {
        console.log(list)
        const listCount = list.length
        let index = 1;
        for(const user of list) {
          setMember(user).then(() => {
            console.log(user.displayName + "の登録完了！！")
            index++
            if(index == listCount){
              dispatch({type: SET_LOADING, value: false})
              popup("全ユーザーの登録完了")
            }
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
  }

  const createJson = () => {
    csvToArray().then((list:Array<FirebaseAuth>)=> {

      // 保存するJSONファイルの名前
      const fileName = "mochi.json";
      
      // データをJSON形式の文字列に変換する。
      const data = JSON.stringify({
        "users": list
      });
      
      // HTMLのリンク要素を生成する。
      const link = document.createElement("a");
      
      // リンク先にJSON形式の文字列データを置いておく。
      link.href = "data:text/plain," + encodeURIComponent(data);
      
      // 保存するJSONファイルの名前をリンクに設定する。
      link.download = fileName;
      
      // ファイルを保存する。
      link.click();
    })
  }


  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <Link href="/signup">トップに戻る</Link>
          <div className='row'>
          {state && state.loading && (
            <div className='row'>
              {state.user.displayName}({state.user.email})でログイン中です。
            </div>
          )}
          </div>
          <div className='row'>
            <button onClick={doRegistFirestore}>firestore登録</button>
            <button onClick={createJson}>json作成</button>
          </div>
        </div>
      </div>
    </main>
  )
}