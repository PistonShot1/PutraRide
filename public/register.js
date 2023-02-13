import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword  } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js' ;

const firebaseConfig = {
  apiKey: "AIzaSyBT9-q1HqKBAWkFPGuB6E-6dxP2BozGLYs",
  authDomain: "login-page-1d5dd.firebaseapp.com",
  projectId: "login-page-1d5dd",
  storageBucket: "login-page-1d5dd.ap pspot.com",
  messagingSenderId: "676280565741",
  appId: "1:676280565741:web:9f134374f6494206c271e4",
  measurementId: "G-FW1Z4PZK7H"
}
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//create button onclick
document.getElementById("create").onclick = function() {
//checks for matching password entered
let validCredential= pass1pass2();
if(validCredential){
  const matric = document.getElementById("matric_input");
  const email = document.getElementById("email_input");
  const password = document.getElementById("pass_input1");
  createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user
    console.log(user);

    //server side
    fetch('/', {
      method: 'POST',
      body: JSON.stringify({ email : user.email, uid : user.uid, password : password.value, matric : matric.value}),
      headers: { 'Content-Type': 'application/json' }
  })
  .then(response => response.text())
  .then(result => {
      console.log(result);
  });

    //client side render
    const register_status = document.getElementById("register_status");
    register_status.style.color= "green";
    register_status.innerHTML= "Account Successfully Registered";

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const register_status = document.getElementById("register_status");
    register_status.style.color= "red";
    if(errorCode == 'auth/email-already-in-use'){
      register_status.innerHTML= "Email is already used"
    }else  if(errorCode == 'auth/invalid-email'){
      register_status.innerHTML= "Invalid email address"
    }else if(errorCode == 'auth/operation-not-allowed'){
      register_status.innerHTML= "Server not responding"
    }else if(errorCode =="auth/weak-password"){
      register_status.innerHTML= "Weak password. Makesure follows the format."
    }else{
      console.log(errorCode);
    }
  });
}
  
}

function pass1pass2(){
  const register_status = document.getElementById("register_status");
  let pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/; //Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters
  if(document.getElementById("pass_input1").value != document.getElementById("pass_input2").value){
    register_status.style.color="red"
    register_status.innerHTML= "Not matching password entered"
    return false;
  }else if(!document.getElementById("pass_input1").value.match(pattern)){
    alert("Please makesure password has:\n-At least one number\n-At least one uppercase and lowercase letter\n-Minimum length of 8 characters")
    return false;
  }else{
    return true;
  }
}


//login button onclick
document.getElementById("login").onclick = ()=>{
 window.location.href = "/login/"
}


