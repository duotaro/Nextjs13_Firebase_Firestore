export interface FormValidError {
    isValid: boolean;
    message: string;
}

// メールアドレスは半角英小文字、半角数字、「-」(ハイフン)、「.」(ドット)、「_」(アンダーバー)のみ
const mail_regex = /^[a-z]+[a-z0-9_-]+@[a-z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i;
/**
 * メールアドレス入力確認
 * @param email 
 * @returns 
 */
export const emailValidation = (email:string) => {
    let valid:FormValidError = {
        isValid: true,
        message: ''
    }
    if(!mail_regex.test(email)){
        valid.isValid = false
        valid.message = 'メールアドレスを正しい形式で入力してください。'
        return valid
    }
    return valid
}

//パスワードは半角数字、半角英字のみで8~16字
export const password_regex = /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
/**
 * パスワード入力確認
 * @param password 
 * @returns 
 */
export const passwordValidation = (password:string) => {
    let valid:FormValidError = {
        isValid: true,
        message: ''
    }
    if(!password_regex.test(password)){
        valid.isValid = false
        valid.message = 'パスワードは8~16文字の半角数字、半角英字で入力してください。'
        return valid
    }
    return valid
}
/**
 * 確認用パスワード
 * @param password 
 * @param passwordConfirm 
 * @returns 
 */
export const passwordConfirmValidation = (password:string, passwordConfirm:string) => {
    let valid:FormValidError = {
        isValid: true,
        message: ''
    }
    if(password !== passwordConfirm){
        valid.isValid = false
        valid.message = 'パスワードが一致しません。'
        return valid
    }
    return valid
}

export const nameValidation = (name:string) => {
    let valid:FormValidError = {
        isValid: true,
        message: ''
    }
    if(!name || name.length > 16 ){
        valid.isValid = false
        valid.message = '名前は16字以内で入力してください。'
        return valid
    }
    return valid
}


