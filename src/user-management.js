import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { oauth } from "./firebase-data";
export async function register(email, password) {
createUserWithEmailAndPassword(oauth, email, password)
  .then((userCredential) => {
    return userCredential;
  })
  .catch((error) => {
    return error.message;
  });
}
export async function signin(email, password) {
    signInWithEmailAndPassword(oauth, email, password)
  .then((userCredential) => {
    return userCredential;
  })
  .catch((error) => {
    return error.message;
  });
}
onAuthStateChanged(oauth, (user) => {
    if (user) {
    } else {
    }
  });