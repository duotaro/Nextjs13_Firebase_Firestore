export class FirebaseAuth {
    "localId":string =  ''
    "email":string =  ''
    "emailVerified":boolean = false
    "displayName": string = ''
    "passwordHash":string = ''
    //"salt":string = "PwSk9CqNrBRBFg=="
    "lastSignedInAt":string =  "1686206933639"
    "createdAt":string =  "1686206933639"
    "providerUserInfo": []
}

  
const sha256 = async (text:string) => {
    // const uint8  = new TextEncoder().encode(text)
    // const digest = await crypto.subtle.digest('SHA-256', uint8)
    // return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('')


    // var hash = crypto.HmacSHA256("test1234", "KEmHEG1L9Y/2kRXNf/zIMfwf4NKIXX70qqjjIgCx3qc=");
    // var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    // return hashInBase64;

    const crypto = require('crypto')

    const secretKey = 'KEmHEG1L9Y/2kRXNf/zIMfwf4NKIXX70qqjjIgCx3qc='

    const hmac = crypto.createHmac('sha256', secretKey)
    hmac.update(text)

    return hmac.digest('hex')
}

export const csvToArray = async () => {
    // CSVファイルを取得
    let csv = new XMLHttpRequest();
    
    // CSVファイルへのパス
    csv.open("GET", "member.csv", false);
    
    // csvファイル読み込み失敗時のエラー対応
    try {
        csv.send(null);
    } catch (err) {
        console.log(err);
    }
    
    // 配列を定義
    let csvArray:Array<FirebaseAuth> = [];
    
    // 改行ごとに配列化
    let lines = csv.responseText.split(/\r\n|\n/);
  
  
    // 1行ごとに処理
    for (let i = 1; i < lines.length; ++i) {
        let cells = lines[i].split(",");
        const passwordHas = await sha256(cells[2])
        //const passwordHas = cells[2]
        let authItem:FirebaseAuth  = {
          localId: cells[2],
          email: `dousoukai+${cells[0]}@gmail.com`,
          emailVerified: false,
          displayName: cells[1],
          passwordHash: btoa(passwordHas),
          lastSignedInAt: "1686206933639",
          createdAt: "1686204650184",
          providerUserInfo: []
        }
        csvArray.push(authItem);
    }

    console.log(csvArray);

    // jsonファイル出力
    // const jsonData = {
    //     "users" : csvArray
    // }

    // // 保存するJSONファイルの名前
    // const fileName = "user.json";    
    // // データをJSON形式の文字列に変換する。
    // const data = JSON.stringify(jsonData);
    // // HTMLのリンク要素を生成する。
    // const link = document.createElement("a");
    // // リンク先にJSON形式の文字列データを置いておく。
    // link.href = "data:text/plain," + encodeURIComponent(data);
    
    // // 保存するJSONファイルの名前をリンクに設定する。
    // link.download = fileName;
    
    // // ファイルを保存する。
    // link.click();

    
    return csvArray
  }