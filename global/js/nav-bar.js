const logoutButton = document.querySelector('.logout-button');
if(logoutButton){
    logoutButton.addEventListener('click', ()=>{
        $.ajax({
            url:'/logout',
            type:'POST',
            success:(res, code, xhr)=>{
                console.log('loged out')
                window.location.replace("/");
            }
        })
    })
}
