# Nextjs13_FIREBASE_FIRESTORE
We have implemented CRUD for Firebase Firestore in NEXT.js13.
When a user registers, he/she is registered as a member of the firestore at the same time.
Please refer to the following repository for the implementation of the authentication function only.
(NEXT.js13でFirebase FirestoreをのCRUD実装しました。ユーザー登録時に同時にfirestoreにメンバーとして登録する形にしています。認証機能のみの実装は以下のリポジトリを参照してください。)
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
`.env.local` は github には反映されません。vercelやgithubのページで環境変数を使う場合は、指定された場所に環境変数を設定する必要があることに注意してください。

## Design
[bootstrap default design](https://getbootstrap.jp/docs/5.0/forms/form-control/)

## In addition
・The process for sign-in and sign-up completion is not implemented. It would be better to handle the transition to the top screen or other screens.(サインインやサインアップ完了の処理が実装していません。例えばトップ画面等への遷移処理を追加した方が良いのではないかと思います。)

・`/src/utils/form_validation.tsx` checks the contents entered in the form. Please change the regular expressions, etc. according to your specifications.(`/src/utils/form_validation.tsx` は、フォームに入力された内容をチェックします。正規表現などは、お客様の仕様に合わせて変更してください。)

・Common processing for popups and error handling was created in `/src/utils/utils.tsx`. Each of them uses alert and console.log, but you can change them to your own implementation.(ポップアップとエラー処理の共通処理は `/src/utils/utils.tsx` に作成しました。それぞれalertとconsole.logを使っていますが、自分の好きな実装に変更する方がいいかもしれません。)

・I have been using a mixture of named export and default export, but this is because I was wondering which was better. If you are interested, please unify them. (named exportとdefault exportを混在して使っていますが、どっちがいいかなーと思いながらやっていたためです。気になる方は統一してください。)

・This time, we used [Cashe API](https://developer.mozilla.org/ja/docs/Web/API/Cache) to temporarily cache members, for example to reduce the number of FIrestore reads. It seems to be possible to use [Firebase Functions for caching](https://tech.gamewith.co.jp/entry/2022/12/19/174657), but this time I used the Cache API.( 今回は[Cashe API](https://developer.mozilla.org/ja/docs/Web/API/Cache)を使って、一時的にメンバーをキャッシュするようにしました。FIrestoreの読み取り回数を減らすなどが方法です。[Firebase Functionsを使ったキャッシュ](https://tech.gamewith.co.jp/entry/2022/12/19/174657)なども実現可能なようでしたが、今回はCache APIを使いました。)