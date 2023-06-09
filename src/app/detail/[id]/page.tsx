'use client';
import { FormEvent, useState } from 'react';
import styles from '../../page.module.css'
import {initializeFirebaseApp} from '../../../lib/firebase/firebase'
import { useFirebaseContext, SET_MEMBER
 } from '@/context/firebase.context';
import { getFirestore } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';
import Link from 'next/link';
import { updateDocument, getCollection, Member, COLLECTION_NAME } from '@/lib/firebase/firestore';

class DetailParam {
  id: string = ''
}

export default function Detail(props:any) {
  const { state, dispatch } = useFirebaseContext()

  const user = state.user
  const params:DetailParam = props.params;
  if(!user || user.uid != params.id){
    return (
      <main className={`${styles.main} row`}>
        <div className="col">ログインしていないか、このページを参照できないユーザーでログインしています。</div>
        <Link href="/signin">ログインはこちら</Link>
      </main>
    )
  }
  let isParticipation:boolean = false
  state.member.map((m:Member) => {
    if(m.id === params.id){
      isParticipation = m.isParticipation
    }
  })

  /** 選択中のラジオボタンvalue */
  const [selected, setSelected] = useState(isParticipation);
  /** ラジオボタン切り替えイベント */
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value === 'true');
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

  const submit = async () => {
    alert("clicked")
    const firebase:FirebaseApp = state.firebase || initializeFirebaseApp();
    const db = state.firestore || getFirestore(firebase);
    await updateDocument(db, COLLECTION_NAME.MEMBERS, params.id, {isParticipation: selected, answered: true})

    // ここで一覧取得も更新しないとダメ
    const getMemberList = async () => {
      getCollection(db, COLLECTION_NAME.MEMBERS).then((res) => {
        let list = []
        if(res){
          for(const m of res){
            list.push(m)
          } 
          // sort
          list.sort((a, b) => {
            return a.name < b.name ? -1 : 1;
          });
        }
        
        dispatch({type: SET_MEMBER, value: list})
      })
    }
    getMemberList()

  }




  return (
    <main className={`${styles.main} row`}>
      <div className="col">
      <form>
        <div className="mb-3">
          <p>名前：{user.displayName}</p>
        </div>
        <div className="mb-3">
            {radioButtons.map(radio => {
                return (
                    <div className="col-4">
                        {/* checked属性に式を定義する */}
                        <input className="form-check-input" type="radio" name="sweets" 
                            value={radio.value} checked={radio.value === new Boolean(selected).toString()} onChange={changeValue}/>
                        <label className="form-check-label">
                            <span className="fs-6">{radio.label}</span>
                        </label>
                    </div>
                )
            })}
        </div>
        <button type="button" className="btn btn-primary" onClick={submit}>更新する</button>
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
