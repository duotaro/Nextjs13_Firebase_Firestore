'use client';
import { FormEvent, useEffect, useState } from 'react';
import styles from '../page.module.css'
import Link from 'next/link';
import { useFirebaseContext, SET_MEMBER } from '@/context/firebase.context';
import { FirebaseAuth, csvToArray } from '@/utils/inputData';
import {initializeFirebaseApp} from '../../lib/firebase/firebase'
import { popup, errorMessage} from '@/utils/utils';
import { getCollection, COLLECTION_NAME, Member} from '@/lib/firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { FirebaseApp } from 'firebase/app';

export default function List() {
  const { state, dispatch } = useFirebaseContext()
  const [ search, setSearch] = useState('');
  const [ memberList, setMemberList] = useState(state.member);

  useEffect(() => {
    
    const firebase:FirebaseApp = state.firebase || initializeFirebaseApp();
    const db = state.firestore || getFirestore(firebase);

  
    const getMemberList = async () => {
      getCollection(db, COLLECTION_NAME.MEMBERS).then((res) => {
        let list = []
        if(res){
          for(const m of res){
            // if(m.name.indexOf("admin") > -1){
            //   continue;
            // }
            list.push(m)
          } 
          // sort
          list.sort((a, b) => {
            return a.name < b.name ? -1 : 1;
          });
        }
        
        setMemberList(list)
        dispatch({type: SET_MEMBER, value: list})
      })
    }

    // contextに値がなければfirestoreから取得
    if(!state.member.length) {
      getMemberList();
    }

  }, []);

  const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const doSearch = () => {
    let list = []
    for(const member of state.member){
      if(member.name.indexOf(search) > -1){
        list.push(member);
      }
    }
    setMemberList(list)
  }


  console.log(memberList)



  return (
    <main className={`${styles.main}`}>
      <div className='row text-white w-100'>
        <div className="col p-3">
          <form>
            <input type="text" defaultValue={search} onChange={handleSearch} placeholder='名前で検索'/>
            <button type="button" className="btn btn-primary m-3" onClick={doSearch}>検索</button>
          </form>
        </div>
        {!state.user && 
         <div className="col p-3">
          <div className="btn btn-secondary">
            <Link href="/signin">ログインして回答する</Link>
          </div>
        </div>
        }
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">名前</th>
            <th scope="col">参加・不参加</th>
            <th scope="col">編集</th>
          </tr>
        </thead>
        <tbody>
          {memberList && memberList.map((m:Member) => {
            return (
              <tr key={m.id}>
                <th scope="row">{m.id}</th>
                <th scope="row">{m.name}</th>
                <td>{m.answered ? (m.isParticipation ? "参加" : "不参加") : "未回答"}</td>
                <td>
                  { state.user && state.user.uid == m.id && <Link href={`/detail/${m.id}`}>編集</Link> }
                  { state.user && state.user.uid !== m.id && "-" }
                  { !state.user && "-" }
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </main>
  )
}
