# Nextjs13_FIREBASE_FIRESTORE
We have implemented CRUD for Firebase Firestore in NEXT.js13.
When a user registers, he/she is registered as a member of the firestore at the same time.
Please refer to the following repository for the implementation of the authentication function only.
(NEXT.js13でFirebase FirestoreをのCRUD実装しました。ユーザー登録時に同時にfirestoreにメンバーとして登録する形にしています。認証機能の実装は以下のリポジトリで解説しましたので参照してください。)
[Nextjs13_Firebase_Auth](https://github.com/duotaro/Nextjs13_Firebase_Auth)

## Demo
https://nextjs13-firebase-auth.vercel.app/

## get start
Create a Firebase account and create a project.(Firebaseのアカウントを作成し、プロジェクトを作成します。)
[Firebase Doc](https://firebase.google.com/docs?hl=ja)

## copy and paste your app's Firebase Configuration at .env.local
アプリのFirebase設定を.env.localにコピー＆ペーストします。
```
NEXT_PUBLIC_FIREBASE_API_KEY=xxxxxx
NEXT_PUBLIC_FIREBASE_AUYH_DOMAIN=xxxxxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxxxx
NEXT_PUBLIC_FIREBASE_MESSAGEING_SENDER_ID=xxxxxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxxxxx
```
`.env.local` is not reflected in github. Note that when using environment variables in vercel or github pages, you must set the environment variable in the given location.
(`.env.local` は github には反映されません。vercelやgithubのページで環境変数を使う場合は、指定された場所に環境変数を設定する必要があることに注意してください。)

## Design
[bootstrap default design](https://getbootstrap.jp/docs/5.0/forms/form-control/)

## In addition
・In this case, the following measures were taken to reduce the number of reads from Firebase.
If there is no member information in the context, it is read from firestore. If there is member information in the context, the information in the context is displayed.The timing of updating the context information is when the screen is initially displayed (including reloading) or when the firestore information is registered or updated by the user.
(今回はFirebaseからの読み取り回数を減らす施策として以下のようにしました。
・contextにmember情報がなければfirestoreから読み取る。あればcontextの情報を表示する。
・contextの情報を更新するタイミングは、画面初期表示(リロード含む)や自身でfirestoreの情報を登録・更新などした場合です。)

・On the `/admin` page, we also created an implementation that automatically populates Firestore with data from csv files.
(/adminページではcsvファイルからFirestoreにデータを自動投入する実装も作成しました。)

・Permissions to read from firestore and register/update firestore can be configured from the console. In this case, we wanted to make it possible as long as the user is logged in, so we did the following.
(firestoreからの読み取りやfirestoreへの登録・更新の権限についてはコンソールから設定が可能です。今回はログインさえしていれば可能ということにしたかったので以下のようにしました。)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth.uid ! = null; 
    }
  }
}
```