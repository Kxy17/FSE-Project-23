import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app, db, oauth } from "./firebase-data";
import { doc, getDoc, setDoc} from "firebase/firestore";
export async function register(username, password, email) {
  if(email){
createUserWithEmailAndPassword(oauth, email, password)
  .then(async(userCredential) => {
    let username = localStorage.getItem("username") || 'no name'
    let data =  {
      username:username,
      topscores:[],
      id:userCredential.user.uid
    }
    await setDoc(doc(db, 'userdata', userCredential.user.uid), data);
    return {status:200, data:data};
  })
  .catch((error) => {
    return {status:502, err:error.message}
  });
}
}
export async function signin(username, password, email) {
    signInWithEmailAndPassword(oauth, username, password)
  .then(async(userCredential) => {
    let data = await getDoc(doc(db, 'userdata', userCredential.user.uid))
    return {status:201, data:data.data()}
  })
  .catch((error) => {
    return {status:503, err:error.message}
  });
}
export async function password_reset(email){
  sendPasswordResetEmail(getAuth(app), email)
  .then(() => {
    return {status:202, data:'Password reset link sent sucessfully!'}
  })
  .catch((error) => {
    return {status:501, err:error.message}
  });
}
password_reset('mulhamreacts@gmail.com')