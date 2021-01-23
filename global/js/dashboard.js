
$.ajax({
    url:'/allforms',
    type:'POST',
    success: (res, code, xhr)=>{
        document.querySelector('#form-selector').innerHTML='';
        let formSelectorContent = "<option disabled selected>Select Form</option>";
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
                formDataInputs=formDataInputs+`<input class='formDataInput' name='${formInput.dataName}' type="text" placeholder="${formInput.dataName}">`
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
    let date = Date(document.querySelector('#date').value)
    document.querySelectorAll('.formDataInput').forEach((input)=>{
        data[input.name]=input.value
    })
    $.post(
        `/addletter/${document.querySelector('#form-selector').value}`,
        {
           data:data,
           date:date, 
        },
        (res, code, xhr)=>{
            console.log(res)
        }
    )

})



