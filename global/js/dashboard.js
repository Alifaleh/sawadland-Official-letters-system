
const placeHolders = {
    'city':'المدينة',
    'longitude':'خط الطول',
    'latitude':'خط العرض',
    'fiberOpticNumber':'عدد شعيرات الكابل',
    'decrementAmount':'مقدار التقليل',
    'beforeDecrement':'قبل التقليل',
    'afterDecrement':'بعد التقليل',
    'path':'المسار',
    'incrementAmount':'مقدار الزيادة',
    'beforeIncrement':'قبل الزيادة',
    'afterIncrement':'بعد الزيادة',
    'port':'المنفذ'
}

$.ajax({
    url:'/allforms',
    type:'POST',
    success: (res, code, xhr)=>{
        document.querySelector('#form-selector').innerHTML='';
        let formSelectorContent = "<option disabled selected>إختر كتاباً</option>";
        res.forEach((form)=>{
            formSelectorContent=formSelectorContent+`<option value="${form.id}">${form.subject}</option>`
        })
        document.querySelector('#form-selector').innerHTML=formSelectorContent;
    }
})

let paths;
let stringPaths = [];
document.querySelector('#form-selector').addEventListener('change', ()=>{
    $.ajax({
        url:`/formdata/${document.querySelector('#form-selector').value}`,
        type:'POST',
        success: (res, code, xhr)=>{
            document.querySelector('#formDataInputs').innerHTML='';
            let formDataInputs = "";
            res.forEach((formInput)=>{
                let formInputDataName=formInput.dataName;
                formInputDataName=formInputDataName.toString();
                if(formInputDataName=='path'){
                    formDataInputs=formDataInputs+`
                        <div class="path-selector__dashboard">
                            <select class="formDataInput" name="path">
                                
                            </select>
                        </div>
                    `
                    $.ajax(
                        {
                            url:`/formpaths/${document.querySelector('#form-selector').value}`,
                            type: 'POST',
                            success: (res, code, xhr)=>{
                                paths = res;
                                let pathSelector = document.querySelector('.path-selector__dashboard select');
                                let pathSelectorContent = '<option class="disabled-option" disabled selected>المسار</option>'
                                res.forEach(data => {
                                    stringPaths.push(`(${data.from} ${data.from_ps} - ${data.to} ${data.to_ps})`);
                                    pathSelectorContent = pathSelectorContent + `<option value = "(${data.from} ${data.from_ps} - ${data.to} ${data.to_ps})">(${data.from} ${data.from_ps} - ${data.to} ${data.to_ps})</option>`
                                });
                                pathSelector.innerHTML = pathSelectorContent;
                            }
                        }
                    );

                }else{
                    formDataInputs=formDataInputs+`<div class="form-data__dashboard"><input class='formDataInput' name='${formInputDataName}' type="text" placeholder="${placeHolders[formInputDataName]}"></div>`
                }
            })
            try{
                document.querySelector('#formDataInputs').innerHTML=formDataInputs;
                document.querySelector('.path-selector__dashboard select').addEventListener('change', ()=>{
                    try{
                        document.querySelector(".formDataInput[name='beforeDecrement']").value=paths[stringPaths.findIndex( (element)=>{return element == document.querySelector('.path-selector__dashboard select').value.toString()})]['lastBandwidth'];
                    }catch(e){
                        try{
                            document.querySelector(".formDataInput[name='beforeIncrement']").value=paths[stringPaths.findIndex( (element)=>{return element == document.querySelector('.path-selector__dashboard select').value.toString()})]['lastBandwidth'];
                        }catch(e){}
                    }
                    try{
                        document.querySelector(".formDataInput[name='port']").value = paths[stringPaths.findIndex( (element)=>{return element == document.querySelector('.path-selector__dashboard select').value.toString()})]['portSpeed'];
                    }catch(e){}
                });
                try{
                    document.querySelector(".formDataInput[name='decrementAmount']").addEventListener('change', ()=>{
                        document.querySelector(".formDataInput[name='afterDecrement']").value= (parseInt(paths[stringPaths.findIndex( (element)=>{return element == document.querySelector('.path-selector__dashboard select').value.toString()})]['lastBandwidth']) - parseInt(document.querySelector(".formDataInput[name='decrementAmount']").value)).toString();
                    });
                }catch(e){
                    try{
                        document.querySelector(".formDataInput[name='incrementAmount']").addEventListener('change', ()=>{
                            document.querySelector(".formDataInput[name='afterIncrement']").value= (parseInt(paths[stringPaths.findIndex( (element)=>{return element == document.querySelector('.path-selector__dashboard select').value.toString()})]['lastBandwidth']) + parseInt(document.querySelector(".formDataInput[name='incrementAmount']").value)).toString();
                        });
                    }catch(e){}
                }

            }catch(e){}

            const currentDate = new Date(Date.now())
            const currentDateString = `${currentDate.getFullYear()}-${(currentDate.getMonth()+1).toString().length==1?'0'+(currentDate.getMonth()+1).toString():(currentDate.getMonth()+1)}-${(currentDate.getDate().toString()).length==1?'0'+(currentDate.getDate()).toString():(currentDate.getDate())}`
            document.querySelector('#date').value=currentDateString;
        }
    })
    console.log()
})



document.querySelector('#dashboard-submit').addEventListener('click', ()=>{
    let data = {}
    let date = Date.parse(document.querySelector('#date').value);
    document.querySelectorAll('.formDataInput').forEach((input)=>{
        const toAddUnit = ['incrementAmount', 'decrementAmount', 'beforeIncrement', 'afterDecrement', 'beforeDecrement', 'afterIncrement'];
        if (toAddUnit.includes(input.name)){
            data[input.name]=input.value+paths[stringPaths.findIndex( (element)=>{return element == document.querySelector('.path-selector__dashboard select').value.toString()})]['unit'];
        }else{
            data[input.name]=input.value;
        }
        
    })
    let pathId = paths[stringPaths.findIndex( (element)=>{return element == document.querySelector('.path-selector__dashboard select').value.toString()})]['id'];
    $.post(
        `/addletter/${document.querySelector('#form-selector').value}?data=${JSON.stringify(data)}&date=${date}&pathId='${pathId}'`,
        (res, code, xhr)=>{
            if(res.status=="1000"){
                window.location.replace(`/download/${res.letterId}`)
            }else{
                console.log(`Error:\napp code: ${res.status}\nserver code: ${code}`)
            }
        }
    )

})





