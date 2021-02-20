

document.querySelector('.signup-button').addEventListener('click', ()=>{
    const inputs = document.querySelectorAll('input');
    const userName = inputs[0].value;
    const password = inputs[1].value;
    $.post(
        `/signup?username=${userName}&password=${password}`,
        (res, code, xhr)=>{
            if(res == "1000"){
                window.location.replace("/login");
            }else if(res == "2009"){
                document.querySelector(".error-div__login").innerHTML = 'الإسم مستخدم';
                document.querySelector(".error-div__login").style.display = "flex";
            }else{
                console.log('Error:\n',`app code: ${res}\n`,`server code: ${code}`);
                document.querySelector(".error-div__login").innerHTML = 'المعلومات خاطئة';
                document.querySelector(".error-div__login").style.display = "flex";
            }
        }
    );
});
