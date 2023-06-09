'use client'
import styles from './page.module.css'
import Link from 'next/link';
import { useFirebaseContext, SET_USER } from '@/context/firebase.context';
import { popup } from '@/utils/utils';


export default async function Home() {
  const { state, dispatch } = useFirebaseContext()
  const signOut = () => {
    dispatch({type: SET_USER, value: null})
    popup("ログアウトしました。")
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className='container'>
          {!state || !state.user && (
            <div className='row'>
              <Link className="btn btn-primary m-3" href="/signup">新規登録</Link>
              <Link className="btn btn-secondary m-3" href="/signin">ログイン</Link>
            </div>
          )}
          {state && state.user && (
            <>
            <div className='row'>
              {state.user.displayName}({state.user.email})でログイン中です。
            </div>
            <div className='row'>
              <button type="submit" className="btn btn-primary" onClick={signOut}>サインアウト</button>
            </div>
            <div className='row'>
              <Link href="/lict">一覧</Link>
              <Link href={`/detail/${state.user.uid}`}>詳細へ</Link>
            </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}