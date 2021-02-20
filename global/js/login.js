
document.querySelector('.login-button').addEventListener("click", ()=>{
    console.log("clicked")

    const username = $('#username')[0].value;
    const password = $('#password')[0].value;
    $.post(
        `/login?username=${username}&password=${password}`,
        {
            "username":username, 
            "password":password,
        },
        
        (res, code, xhr)=>{
            console.log(res)
            if(res == "1000"){
                window.location.replace("/dashboard");
            }else if(res == "2010"){
                document.querySelector(".error-div__login").innerHTML = 'الحساب غير مؤكد';
                document.querySelector(".error-div__login").style.display = "flex";
            }else{
                console.log('Error:\n',`app code: ${res}\n`,`server code: ${code}`);
                document.querySelector(".error-div__login").innerHTML = 'المعلومات خاطئة';
                document.querySelector(".error-div__login").style.display = "flex";
            }
        }
    )
})

