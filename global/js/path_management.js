let paths = [];

let type = 3;

let selectedPathId = "";

const input_from = document.querySelector(".path-info-popup-input input[name='from']");
const input_from_ps = document.querySelector(".path-info-popup-input input[name='from-ps']");
const input_to = document.querySelector(".path-info-popup-input input[name='to']");
const input_to_ps = document.querySelector(".path-info-popup-input input[name='to-ps']");
const bandwidth = document.querySelector(".path-info-popup-input input[name='bandwidth']");
const unitSelector = document.querySelector(".unit-selector");
const typeSelector = document.querySelector(".type-selector");
const portSpeed = document.querySelector(".path-info-popup-input input[name='port-speed']");
const deleteButton = document.querySelector(".delete");
const saveButton = document.querySelector(".save");

$.post(
    `/pathmanagement?type=1`,
    (res, code, xhr)=>{
        paths = res;
        const pathsContainer = document.querySelector(".paths-container__paths > div");
        res.forEach(element => {
            pathsContainer.innerHTML+=`<div class="ez-row main-aa-sp-bt cross-aa-center path-holder__paths"><h1 class="css_font-size_12px_sm css_font-size_20px_md css_font-size_25px_lg css_font-size_28px_xl">${element.from} ${element.from_ps} - ${element.to} ${element.to_ps}</h1><button class="view-path" pathId="${element.id}">View</button></div>`
        });

        document.querySelector(".add-path-button").addEventListener("click", ()=>{
            type = 4;
            deleteButton.style.display ='none'
            input_from.value = "";
            input_from_ps.value = "";
            input_to.value = "";
            input_to_ps.value = "";
            bandwidth.value = "";
            unitSelector.value = "null";
            typeSelector.value = "null";
            portSpeed.value = "";
            document.querySelector(".path-info-popup-background").style.display = "flex";
        })

        document.querySelectorAll('.view-path').forEach(element=>{
            element.addEventListener('click', (event)=>{
                const pathId = event.target.getAttribute('pathId');
                selectedPathId = pathId;
                type = 3;
                deleteButton.style.display ='block';
                document.querySelector(".path-info-popup-background").style.display = "flex";
                $.post(
                    `/pathmanagement?type=2&pathId=${pathId}`,
                    (res, code, xhr)=>{
                        input_from.value = res.from;
                        input_from_ps.value = res.from_ps;
                        input_to.value = res.to;
                        input_to_ps.value = res.to_ps;
                        bandwidth.value = res.lastBandwidth;
                        unitSelector.value = res.unit;
                        typeSelector.value = res.type;
                        portSpeed.value = res.portSpeed;
                    }
                );
            })
        });
    }
)

document.querySelector(".save").addEventListener("click", ()=>{
    const pathInfo = JSON.stringify({
        id:selectedPathId,
        from:input_from.value,
        from_ps:input_from_ps.value,
        to:input_to.value,
        to_ps:input_to_ps.value,
        bandwidth:bandwidth.value,
        unit:unitSelector.value,
        type:typeSelector.value,
        portSpeed:portSpeed.value,
    })
    $.post(
        `/pathmanagement?type=${type}&pathInfo=${pathInfo}`,
        (res, code, xhr)=>{
            if(res =="1000"){
                document.querySelector(".path-info-popup-background").style.display = "none";
                location.reload();
            }
        }
    )
})

document.querySelector(".delete").addEventListener("click", ()=>{
    const validator = confirm("Are you sure you want to delete this path ?");
    if(validator){
        $.post(
            `/pathmanagement?type=5&pathId=${selectedPathId}`,
            (res, code, xhr)=>{
                console.log(res)
                document.querySelector(".path-info-popup-background").style.display = "none";
                location.reload();
            }
        )
    }
})

document.querySelector(".path-info-popup-background").addEventListener("click", ()=>{
    document.querySelector(".path-info-popup-background").style.display = "none";
})

document.querySelector(".path-info-popup").addEventListener("click", e=>e.stopPropagation())

document.querySelector(".exit-button").addEventListener("click", ()=>{
    document.querySelector(".path-info-popup-background").style.display = "none";
})
