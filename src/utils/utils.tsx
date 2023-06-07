/**
 * alertにしているが独自実装の方が良い
 * @param message 
 */
export const popup = (message:string) => {
    alert(message);
}

/**
 * console.logにしているが、ユーザーにエラーメッセージを知らせる方法を考慮すべき
 * @param message 
 */
export const errorMessage = (message:string) => {
    // alertを使ったいるが、独自実装にしてもいい。
    console.log("■■■■■■■■■■■■■■■■■■■■■■■");
    console.log(message);
    console.log("■■■■■■■■■■■■■■■■■■■■■■■");
}
