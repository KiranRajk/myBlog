const { json } = require("express");

function doSignUp( ){
    let password = document.getElementById('password').value ;
    let cnfrmpassword = document.getElementById('cnfrmpassword').value ;
    if(password === cnfrmpassword) {

    let formData = { };  //object created to store data
    formData.username = document.getElementById('username').value;  // data stored in object as key value pair
    formData.email = document.getElementById('email').value;
    formData.password = document.getElementById('password').value;
    
    fetch('/register' ,{
        method: "post" , //client side data send to server- post
        headers : {"Content-Type" :  "application/json"},   //to send data to server which is in json format , This header informs the server that the request body is in JSON format.
        body : JSON.stringify(formData)  //convert the object to json string
    }).then((data) =>{
        window.location.href = "/"
        console.log(data);
    })

    } else alert("Passwords don't match");

}

function checkPassword( ){
    let password = document.getElementById('password').value ;
    let cnfrmpassword = document.getElementById('cnfrmpassword').value ;
    let message = document.getElementById('warning');

    if(password.length != 0){
        if( password == cnfrmpassword){
            message.textContent = "Password Matched";
            message.style.color = "green"; 
        }
        else{
            message.textContent = "Password dont match";
            message.style.color = "red";
        } 
    } 

}


function doLogin( ){
    let loginData = { };
    loginData.email = document.getElementById('email').value;
    loginData.password = document.getElementById('password').value;

    fetch('/login' , {
        method : 'post',
        headers : {'Content-Type' : 'application/json' },
        body : JSON.stringify(loginData)
    }).then((response) => response.json( ) )   //parse 
    .then((data) => {
        if(data.login){
            window.location.href = '/home'
        }
        else{
            console.log(data);
            document.getElementById('warning').innerHTML = "Invalid Credentials";
            setTimeout(() => {
                document.getElementById('warning').innerHTML = " ";
            },5000)
        }
    })
}

function logout( ){
     localStorage.clear( )
     sessionStorage.clear( )
     location.assign('/logout')
}

function showImages( ){
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    document.getElementById('imagePreview').innerHTML = null;
    const selectedImage = imageInput.files   
    for(let i =0; i < selectedImage.length; i++)
    {
        const image = document.createElement('img');
        image.src = URL.createObjectURL(selectedImage[ i ]);
        image.style.width = "150px";
        image.style.margin = "3px";
        imagePreview.appendChild( image);
    }
}