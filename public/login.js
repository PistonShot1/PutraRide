// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js' ;
const firebaseConfig = {
 //get your config and paste here
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("register_button").onclick = function(){
  
  window.location.href="/"
}

document.getElementById("login_button").onclick = function(){
  // const auth = getAuth();
    var email = document.getElementById("email_input");
    var password  = document.getElementById("pass_input");
    
    signInWithEmailAndPassword(auth, email.value,password.value)

        .then(
          ()=>{
            window.location.href="/HomePage/" //nanda's html page
          }
          )
        
        .catch((e)=>{

      const login_status = document.getElementById("login_status")
      const forgot_pass = document.getElementById("forgot_pass")

      forgot_pass.style.marginTop ="-13px"

      if(e.code == "auth/wrong-password"){ 
        login_status.innerHTML = "Wrong account or password"
      } else if(e.code == "auth/user-not-found"){ 
        login_status.innerHTML = "Invalid account. Register first!"
      } else{
        
        login_status.innerHTML = "Invalid credentials"
      }
      
    })
    
  }

  //password show-hide ion-icon toggle
  const eye_button1 = document.getElementById("eye_button1")
  const eye_button2 = document.getElementById("eye_button2")
  eye_button1.addEventListener("click", ()=>{
    eye_button1.style.display = "none"
    eye_button2.style.display = "block"
    document.getElementById("pass_input").setAttribute("type","text")
  })
  eye_button2.addEventListener("click", ()=>{
    eye_button1.style.display = "block"
    eye_button2.style.display = "none"
    document.getElementById("pass_input").setAttribute("type","password")
  })