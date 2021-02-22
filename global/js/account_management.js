let accounts = [];

let selectedId = "";

$.post(
    '/accountmanagement?type=1',
    (res,code,xhr)=>{
        if(code=="success"){
            const accountsContainer = document.querySelector(".accounts-container__accounts > div");
            res.forEach(element => {
                accountsContainer.innerHTML+=`<div class="ez-row main-aa-sp-bt account-holder__accounts"><h1>${element.username}</h1><button class="view-user" userId="${element.id}">View</button></div>`
            });

            document.querySelectorAll('.view-user').forEach(element=>{
                element.addEventListener('click', (event)=>{
                    const userId = event.target.getAttribute('userid');
                    document.querySelector(".user-info-popup-background").style.display = "flex";
                    $.post(
                        `/accountmanagement?type=2&userId=${userId}`,
                        (res, code, xhr)=>{
                            selectedId = res.id;
                            document.querySelector(".user-info-popup-input > input").value = res.username;
                            document.querySelector(".user-info-popup-input > .type-selector").value = res.level;
                            document.querySelector(".user-info-popup-input > .verification-selector").value = res.verifyed;
                        }
                    );
                })
            })
        }
    }
);

document.querySelector(".user-info-popup-background").addEventListener("click", ()=>{
    document.querySelector(".user-info-popup-background").style.display = "none";
    document.querySelector(".user-info-popup-error").innerHTML = ""
})

document.querySelector(".user-info-popup").addEventListener("click", e=>e.stopPropagation())

document.querySelector(".exit-button").addEventListener("click", ()=>{
    document.querySelector(".user-info-popup-error").innerHTML = ""
    document.querySelector(".user-info-popup-background").style.display = "none";
})

document.querySelector('.user-info-popup button').addEventListener("click", ()=>{
    const userName = document.querySelector(".user-info-popup-input > input").value;
    const level = document.querySelector(".user-info-popup-input > .type-selector").value;
    const isVerified = document.querySelector(".user-info-popup-input > .verification-selector").value;
    const userInfo = {selectedId:selectedId,username:userName,level:level,isverified:isVerified};
    const JsonUserInfo = JSON.stringify(userInfo);
    $.post(
        `/accountmanagement?type=3&userInfo=${JsonUserInfo}`,
        (res, code, xhr)=>{
            if(res == "1000"){
                document.querySelector(".user-info-popup-background").style.display = "none";
                document.querySelector(".user-info-popup-error").innerHTML = ""
                location.reload();
            }else if (res == "2009"){
                document.querySelector(".user-info-popup-error").innerHTML = "هذا الإسم مستخدم مسبقاً"
            }
        }
    )
})

