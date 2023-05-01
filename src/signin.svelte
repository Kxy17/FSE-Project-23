<script>
    import {userData} from './user-management'
</script>
<div class="register-form">
    <div class="form">
      <div class="form-heading">
        <h2>sign in</h2>
      </div>
      <form class="login-page">
        <input type="email" 
               placeholder="E-mail" required/>
        <input type="password" placeholder="password" required/>      
        <button>login</button>
      </form>
      <p class="message">Not registered?
        <a href="#">Create an account</a>
      </p>
    </div>
  </div>
  <style>
    .register-form {
  height: 450px;
  width: 400px;
  font-family: sans-serif;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  border-radius: 3px;
  overflow: hidden;
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
  </style>