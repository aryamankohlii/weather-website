
const weatherform= document.querySelector('form')
const search=document.querySelector('input')
const messageone=document.querySelector('#message1')
const messagetwo=document.querySelector('#message2')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    console.log(location)
})
fetch('http://localhost:3000/weather?address=!').then((response)=>{
    response.json().then((data) =>{
        if(data.error){
            console.log(data.error)

        }
        else{
            console.group(data.location)
            console.log(data.forecast)
            messageone.textContent=data.location
            messagetwo.textContent=fata.forecast
        }
        })
    })
   