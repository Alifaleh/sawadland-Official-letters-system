// div.ez-row.main-aa-sp-bt.account-holder__accounts
// h1 ali 
// button  view

let accounts = [];

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
                    console.log(userId)
                })
            })
        }
    }
);

