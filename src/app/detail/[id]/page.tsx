'use client';
import { FormEvent, useState } from 'react';
import styles from '../../page.module.css'
import {initializeFirebaseApp} from '../../../lib/firebase/firebase'
import { useFirebaseContext, SET_USER, SET_FIREBASE_APP, SET_FIREBASE_AUTH, SET_LOADING } from '@/context/firebase.context';
import { getFirestore } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';
import Link from 'next/link';
import { updateDocument, COLLECTION_NAME, Member } from '@/lib/firebase/firestore';

class DetailParam {
  id: string = ''
}

export default function Detail(params:DetailParam) {
  const { state, dispatch } = useFirebaseContext()

  const user = state.user
  if(!user || user.uid != params.id){
    return (
      <main className={`${styles.main} row`}>
        <div className="col">ログインしていないか、このページを参照できないユーザーでログインしています。</div>
      </main>
    )
  }
  const thisMember = state.member.map((m:Member) => {
    if(m.id === params.id){
      return m
    }
  })

  /** 選択中のラジオボタンvalue */
  const [selected, setSelected] = useState(thisMember.isParticipation);
  /** ラジオボタン切り替えイベント */
  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value);
  }

  const radioButtons = [
    {
        label: "参加",
        value: "true"
    },
    {
        label: "不参加",
        value: "false"
    }
  ]

  const submit = async (e : FormEvent<HTMLFormElement>, id:string) => {
    const firebase:FirebaseApp = state.firebase || initializeFirebaseApp();
    const db = state.firestore || getFirestore(firebase);
    await updateDocument(db, COLLECTION_NAME.MEMBERS, id, {isParticipation: selected})
  }




  return (
    <main className={`${styles.main} row`}>
      <div className="col">
      <form onSubmit={(e) => submit(e, thisMember.id)}>
        <div className="mb-3">
          <p>名前：{thisMember.name}</p>
        </div>
        <div className="mb-3">
            {radioButtons.map(radio => {
                return (
                    <div className="col-4">
                        {/* checked属性に式を定義する */}
                        <input className="form-check-input" type="radio" name="sweets" 
                            value={radio.value} checked={radio.value === selected} onChange={changeValue}/>
                        <label className="form-check-label">
                            <span className="fs-6">{radio.label}</span>
                        </label>
                    </div>
                )
            })}
        </div>
        <button type="submit" className="btn btn-primary" >更新する</button>
      </form>
      <div className="mt-5 row">
            <div className="col-2 p-1">
              <Link href="/">トップに戻る</Link>
            </div>
            <div className="col-2 p-1">
              <Link href="/list">一覧へ</Link>
            </div>
        </div>
      </div>
    </main>
  )
}
