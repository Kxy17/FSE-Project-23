<script>
  let username, password, logon, account = true, email, message='';
    import {userData} from './user-management'
    import {signin} from './user-management'
    import {register} from './user-management'
    async function login(){
      message = ''
      if(username=='') return
      if(validateEmail(username)){logon = await signin(false, password, username)}
      else{logon = await signin(username, password, false)}
      if(logon.status > 299) return message = "Invalid Credentials" 
      userData.set(logon)
    }
    async function create(){
      message = ''
      if(validateEmail(username)) return message = 'Username cannot be an email.'
      if(email!=''&&!validateEmail(email)) return message = 'Invalid email.'
      if(username == '' && email == '') return message = 'You must create an account using either an email or username.'
      if(username.length < 4) return message = 'Username must be at least 4 letters.'
      if(password.length < 6) return message = 'Password must be at least 6 letters.'
      if(username != ""){
        if(email != ""){
          logon = await register(username, password, email)
        }else{
          logon = await register(username, password, false)
        }
      }else{
        if(email != ""){
          logon = await register(false, password, email)
        }
      }
      userData.set(logon)
    }
    function validateEmail(email) {
  const regexExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  return regexExp.test(email);
  }
  async function autolog(){
  if(localStorage.getItem('username')){
    username = localStorage.getItem('username')
    password = localStorage.getItem('password')
    await login()
  }
}
autolog()
</script>
<div class="register-form">
    <div class="form">
      {#if account}
      <div class="form-heading">
        <h2>Sign in</h2>
      </div>
      <form class="login-page" on:submit={function(submit){submit.preventDefault();login()}}>
        <input type="text" placeholder="Email or Username" bind:value={username} required/>
        <input type="password" placeholder="password" bind:value={password} required/>     
        <p>{message}</p> 
        <button type="submit">Log in</button>
      </form>
      <button on:click={function(){account = false}}>Not registered?
        <p>Create an account</p>
        </button>
      {:else}
      <div class="form-heading">
        <h2>Register</h2>
      </div>
      <form class="login-page" on:submit={function(submit){submit.preventDefault();create()}}>
        <input type="text" placeholder="Username (optional)" bind:value={username}/>
        <input type="text" placeholder="Email (optional)" bind:value={email}/>
        <input type="password" placeholder="password" bind:value={password} required/>
        <p>{message}</p>      
        <button type="submit">Create</button>
      </form>
      <button on:click={function(){account = true}}>Already Registered?
        <p>Sign in</p>
        </button>
      {/if}
    </div>
  </div>
  <style>
    .register-form {
  height: 450px;
  width: 400px;
  margin: auto;
  font-family: sans-serif;
  border-radius: 3px;
  overflow: hidden;
  margin-top: calc(75vh - 450px);
  border-radius: 25px;
}
.form {
    width: 90%;
    margin: auto;
    position: relative;
    z-index: 1;
    background: #FFF;
    text-align: center;
}
.form .form-heading{
    font: 400 1.2em sans-serif;
    color: #16A085;
    padding: 25px;
}
.form .form-heading h2{
    text-transform: uppercase;
}
.form input {
    width: 90%;
    background: #f2f2f2;
    color: #16A085;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    font-size: 14px;
    outline: 0;
}
.form button {
  width: 100%;
  color: #FFF;
  background: #16A085;
  text-transform: uppercase;
  border: 0;
  padding: 15px;
  margin-top: 20px;
  font-size: 14px;
  cursor: pointer;
  outline: 0;
}
.form button:hover,
.form button:focus {
  background: #11826B;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #11355C;
  text-decoration: none;
}
button{
    background-color: blue;
  }
  </style>