"use client";
import Link from "next/link";
import React, { Dispatch, createContext, useReducer, useContext, useEffect } from "react";
import { initializeFirebaseApp } from '../lib/firebase/firebase'
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "@/component/loading";

type StateType = {
  firebase: any;
  firebaseAuth: any;
  firestore: any;
  user: any;
  member: any;
  loading: boolean
};

type ActionType = {
  type: string;
  value: any;
};

const initialState: StateType = {
  firebase: null,
  firebaseAuth: null,
  firestore: null,
  user: null,
  member: [],
  loading : false
};

export const INIT_FIREBASE_APP =  'INIT_FIREBASE_APP';
export const INIT_FIREBASE_AUTH = 'INIT_FIREBASE_AUTH';
export const INIT_FIRESTORE = 'INIT_FIRESTORE';
export const SET_FIREBASE_APP = 'SET_FIREBASE_APP'
export const SET_USER =  'SET_USER';
export const SET_MEMBER =  'SET_MEMBER';
export const SET_FIRESTORE = 'SET_FIRESTORE';
export const SET_FIREBASE_AUTH = 'SET_FIREBASE_AUTH';
export const SET_LOADING = 'SET_LOADING';

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case INIT_FIREBASE_APP:
        return { ...state, firebase: initializeFirebaseApp() };
    case INIT_FIRESTORE:
        return { ...state, firestore: state.firebase ? getFirestore(state.firebase) : null } 
    case SET_FIREBASE_APP:
        return { ...state, firebase: action.value } 
    case SET_FIRESTORE:
        return { ...state, firestore: action.value } 
    case SET_FIREBASE_AUTH:
        return { ...state, firebaseAuth: action.value } 
    case SET_USER:
        return { ...state, user: action.value } 
    case SET_MEMBER:
        return { ...state, member: action.value } 
    case SET_LOADING:
        return { ...state, loading: action.value } 
    default:
        return state;
  }
};

export const FirebaseContext = createContext<{
  state: StateType;
  dispatch: Dispatch<ActionType>;
}>({ state: initialState, dispatch: () => null });

export const FirebaseContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      if(state.firebase){
        const auth = getAuth(state.firebase)
        return onAuthStateChanged(auth, (user) => {
          dispatch({type: SET_USER, value: user})
        })
      }
    } catch (error) {
      dispatch({type: SET_USER, value: null})
      throw error
    }
  }, [])


  return (
    <>
    <FirebaseContext.Provider value={{ state, dispatch }}>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <ul className="nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="#">Top</Link>
              </li>
              {!state.user && 
              <li className="nav-item">
                <Link className="nav-link" href="/signin">Signin</Link>
              </li>
              }
              {!state.user && 
              <li className="nav-item">
                <Link className="nav-link" href="/signup">Signup</Link>
              </li>
              }
              {state.user && 
              <li className="nav-item">
                <Link className="nav-link" href="/list">一覧</Link>
              </li>
              }
              {state.user && 
              <li className="nav-item">
                <Link className="nav-link" href={`/detail/${state.user.uid}`}>投票</Link>
              </li>
              }
            </ul>
          </div>
        </nav>
      {children}
    </FirebaseContext.Provider>
    {state.loading && <Loading></Loading>}
    </>
  );
};

export const useFirebaseContext = () => useContext(FirebaseContext)