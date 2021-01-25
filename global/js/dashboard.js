
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
                formDataInputs=formDataInputs+`<div class="form-data__dashboard"><input class='formDataInput' name='${formInputDataName}' type="text" placeholder="${placeHolders[formInputDataName]}"></div>`
            })
            document.querySelector('#formDataInputs').innerHTML=formDataInputs;
        }
    })
    console.log()
})


const currentDate = new Date(Date.now())
const currentDateString = `${currentDate.getFullYear()}-${(currentDate.getMonth()+1).toString().length==1?'0'+(currentDate.getMonth()+1).toString():(currentDate.getMonth()+1)}-${currentDate.getDate()}`
document.querySelector('#date').value=currentDateString;


document.querySelector('#dashboard-submit').addEventListener('click', ()=>{
    let data = {}
    let date = Date.parse(document.querySelector('#date').value);
    document.querySelectorAll('.formDataInput').forEach((input)=>{
        data[input.name]=input.value
    })
    $.post(
        `/addletter/${document.querySelector('#form-selector').value}?data=${JSON.stringify(data)}&date=${date}`,
        (res, code, xhr)=>{
            if(res.status=="1000"){
                window.location.replace(`/download/${res.letterId}`)
            }else{
                console.log(`Error:\napp code: ${res.status}\nserver code: ${code}`)
            }
        }
    )

})





