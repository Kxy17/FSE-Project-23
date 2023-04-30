import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app, db, oauth } from "./firebase-data";
import { doc, getDoc, setDoc} from "firebase/firestore";
import { bcrypt, bcryptVerify} from "hash-wasm";
import { writable } from "svelte/store";
export const userData = writable({})
export async function register(username, password, email) {
let data =  {
  topscores:[],
}
if(username) data.username = username;
  if(email){
    data.id = (await authenticate(email, password)) 
    userData.set(data)
    await setDoc(doc(db, 'userdata', data.id), data);
    if(username) await setDoc(doc(db, 'userdata', username), {password:(await generate_hash(password)), link:data.id})
    return {status:200, data:data};
}else{
  if((await getDoc(doc(db, 'userdata', username))).exists()) return 'user already exists!'
  userData.set(data)
  await setDoc(doc(db, 'userdata', username), {password:(await generate_hash(password)), data:data})
  return 'user created sucessfully'
}
}
export async function signin(username, password, email) {
  if(email){
    return signInWithEmailAndPassword(oauth, email, password)
  .then(async(userCredential) => {
    let data = (await getDoc(doc(db, 'userdata', userCredential.user.uid))).data()
    userData.set(data)
    return {status:201, data:data}
  })
}else{
  let data = (await getDoc(doc(db, 'userdata', username))).data()
  if(checkHash(password, data.password)){
    userData.set(data)
    return {status:203, data:data}
  }else{
    return {status:400, err:'wrong password!'}
  }
}
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
async function generate_hash(credential){
  const salt = new Uint8Array(16);
  window.crypto.getRandomValues(salt);
  const key = await bcrypt({ //the most complex hashing mechanism ever
    password: credential,
    salt, // salt is a buffer containing 16 random bytes
    costFactor: 11,
    outputType: 'encoded', // return standard encoded string containing parameters needed to verify the key
  });
  return key
}
async function link_user(email, username, password){
  try{
  return await signin(false, password, email)
  .then(async(value)=>{
    console.log(value)
  if((await getDoc(doc(db, 'userdata', username))).exists()) return {status:405, err:'user exists'}
  await setDoc(doc(db, 'userdata', username), {password:(await generate_hash(password)), link:value.data.id})
  return 'linked user sucessfully'
  }).catch((err)=>{
    return err
  })
}catch(err){
  return err
}
}
export async function link_email(email, username, password){
  await register(false, password, email)
  .then(async(authenticationId)=>{
    console.log(authenticationId)
    await setDoc(doc(db, 'userdata', username), {password:(await generate_hash(password)), link:authenticationId.data.id})
    return 'sucessfully linked email'
  })
}
async function authenticate(email, password, user){
  return await createUserWithEmailAndPassword(oauth, email, password)
  .then(async(userCredential) => {
    if (!user) return userCredential.user.uid
    await setDoc(doc(db, 'userdata', userCredential.user.uid), {password:password, data:user.data.username})
    return {status:204, data:'doc set'}
  })
  .catch((error) => {
    return {status:404, data:error.message}
  });
}
async function checkHash(credential, hash){
 const isValid = await bcryptVerify({
    password: credential,
    hash: hash,
  });
  return isValid
}
console.log(await link_email('getrectsss@gmail.com', 'testacc', 'testpass'))