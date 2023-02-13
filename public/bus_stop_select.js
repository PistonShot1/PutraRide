
const ion_icon = document.getElementById("ion_icon_back");

ion_icon.addEventListener("click",()=>{
    window.location.href ="/HomePage/HomePage.html"
});

function busStopID(id){
  fetch('/', {
    method: 'POST',
    body: JSON.stringify({ email : user.email, uid : user.uid, password : password.value}),
    headers: { 'Content-Type': 'application/json' }
})
.then(response => response.text())
.then(result => {
    console.log(result);
});
}

