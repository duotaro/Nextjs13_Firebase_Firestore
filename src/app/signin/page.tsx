'use client';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import {FormValidError, emailValidation, passwordValidation, passwordConfirmValidation} from '../../utils/form_validation'
import styles from '../page.module.css'
import {initializeFirebaseApp} from '../../lib/firebase/firebase'
import { useFirebaseContext, SET_USER, SET_FIREBASE_APP, SET_FIREBASE_AUTH, SET_LOADING } from '@/context/firebase.context';
import { User, signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { popup, errorMessage} from '@/utils/utils';
import Link from 'next/link';

export default function Signin() {
  const { state, dispatch } = useFirebaseContext()
  
  const defaulyFormError:FormValidError = {
    isValid: true,
    message: ''
  } 
  const [email, setEmail] = useState('');
  const [validEmail, setvalidEmail] = useState(defaulyFormError);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(defaulyFormError);

  const [user, setUser] = useState<User>();
 

  const handleChangeEmail = (e : React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setvalidEmail(emailValidation(e.target.value));
  }
  const handleChangePassword = (e : React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setValidPassword(passwordValidation(e.target.value));
  }

  /**
   * 新規登録
   */
  const submit = async (e : FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const firebase = state.firebase || initializeFirebaseApp();
      dispatch({type: SET_FIREBASE_APP, value: firebase})
      const auth = state.firebaseAuth || getAuth(firebase);
      dispatch({type: SET_FIREBASE_AUTH, value: auth})
      dispatch({type: SET_LOADING, value: true})

      await signInWithEmailAndPassword(auth, email, password).then((res) => {
        dispatch({type: SET_LOADING, value: false})
        if(res.user){
          setUser(res.user);
          popup("ログイン完了")
          dispatch({type: SET_USER, value: res.user})
          const router = useRouter();
          router.push("/");
        } else {
          errorMessage('ログイン処理中にエラーが発生しました。')
        }
      }).catch((error) => {
        dispatch({type: SET_LOADING, value: false})
        errorMessage(error)
        
      })
  }

  return (
    <main className={`${styles.main} row`}>
      <div className="col">
      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">メールアドレス</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" defaultValue={email} onChange={handleChangeEmail}/>
          {!validEmail.isValid && (
            <div id="emailFeedback" className="invalid-feedback">{validEmail.message}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">パスワード</label>
          <input type="password" className="form-control" id="password" defaultValue={password} onChange={handleChangePassword} />
          {!validPassword.isValid && (
            <div id="passwordFeedback" className="invalid-feedback">{validPassword.message}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary" >ログイン</button>
      </form>
      <div className="mt-5 row">
            <div className="col-2 p-1">
              <Link href="/">トップに戻る</Link>
            </div>
            <div className="col-2 p-1">
              <Link href="/signup">新規登録はこちら</Link>
            </div>

            <div className="col-2 p-1">
              <Link href="/list">同窓生一覧</Link>
            </div>
        </div>
      </div>
    </main>
  )
}
