import { doc, collection, query, setDoc, orderBy, updateDoc, addDoc, getDoc, getDocs } from "firebase/firestore";
import { popup, errorMessage} from "@/utils/utils";

/**
 * メンバー
 */
export class Member {
    /** id */
    id: string = '';
    /** 名前 */
    name:string = '';
    /** 画像URL */
    photoURL:string = '';
    /** 参加可否 null可 */
    isParticipation:boolean = false;
    /** 回答済みかどうか */
    answered:boolean = false
}

/**
 * firestoreのinit確認
 * @param db 
 * @returns 
 */
export const notInitFirestore = (db:any) => {
    if(!db){
        popup("Firestoreが初期化されていない可能性があります。正しく設定されているか確認してください。")
        return false;
    }
    return true
}

export const COLLECTION_NAME = {
    MEMBERS: 'members'
}

/**
 * firestoreのコレクションにデータを追加します。
 * @param db 
 * @param collectionName 
 * @param documentId 
 * @param data 
 */
export const setDocument = async (db:any, collectionName:string, documentId:string, data:any) => {
    if(!notInitFirestore(db)){
        return;
    }
    if(documentId){
        await setDoc(doc(db, collectionName, documentId), data);
    } else {
        await addDoc(collection(db, collectionName), data);
    }   
}

export const updateDocument = async (db:any, collectionName:string, documentId:string, data:any) => {
    if(!notInitFirestore(db)){
        return;
    }
    if(!documentId){
        return
    }
    await updateDoc(doc(db, collectionName, documentId), data);   
}

/**
 * コレクションから全てのドキュメントを取得します。
 * @param db 
 * @param collectionName 
 * @returns 
 */
export const getCollection = async (db:any, collectionName:string) => {
    if(!notInitFirestore(db)){
        return;
    }
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    let res:Array<Member> = []
    querySnapshot?.forEach((item) => {
          const data = item.data()
          const member:Member = {
            id: data.id,
            name: data.name,
            photoURL: '',
            isParticipation: data.isParticipation,
            answered: data.answered
          }

          res.push(member)
    })

    return res

}


/**
 * 指定コレクション内の指定ドキュメントを取得します
 * @param db 
 * @param collectionName 
 * @param documentId 
 * @returns 
 */
export const getDocument = async (db:any, collectionName:string, documentId:string) => {
    if(!notInitFirestore(db)){
        return;
    }
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        // docSnap.data() will be undefined in this case
        errorMessage("No such document!");
        return {}
    }
}
