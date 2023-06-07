'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link';
import { useFirebaseContext } from '@/context/firebase.context';
import { SET_USER } from '@/context/firebase.context';
import { popup} from '@/utils/utils';

export default function Home() {

  const { state, dispatch } = useFirebaseContext()
  const signOut = () => {
    dispatch({type: SET_USER, value: null})
    popup("ログアウトしました。")
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          {!state.user && (
            <>
            <Link href="/signup">新規登録</Link>
            <Link href="/signin">ログイン</Link>
            </>
          )}
          {state.user && (
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
