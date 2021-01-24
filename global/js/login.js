
$('.login-button').on("click", ()=>{
    const username = $('#username')[0].value;
    const password = $('#password')[0].value;
    $.post(
        `/login?username=${username}&password=${password}`,
        {
            "username":username, 
            "password":password,
        },
        
        (res, code, xhr)=>{
            if(res == "1000"){
                window.location.replace("/dashboard");
            }else{
                console.log('Error:\n',`app code: ${res}\n`,`server code: ${code}`);
                document.querySelector(".error-div__login").style.display = "flex";
            }
        }
    )
})

