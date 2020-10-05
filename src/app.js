const path = require('path')
const express= require("express");
const hbs=require('hbs')
const app=express();
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');

//define paths for different directories
const publicpath=path.join(__dirname,'../public');
const viewpath=path.join(__dirname,'../templates/views');
const partialpath=path.join(__dirname,'../templates/partials');

//set the paths for handlebars and views
app.set('view engine', 'hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath);
//set the path for handlebar engines
app.use(express.static(publicpath))

app.get('',(req,res) => {
res.render('index',{
    title:"Aryaman Kohli",
    course: "CSE"
})
})
app.get("/help",(req,res) =>{
    res.send({
        name:"Andrew",
        age:60
    })
})
app.get("/about",(req,res) =>{
    res.render('about',{
        title:"aryaman",
        Course:"cse"
    })
})
app.get("/weather",(req,res) =>{
    if(!req.query.address)
    {
        return res.send({
            error:"COULDNT LOAD ADDRESS"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location})=>{
        if(error)
        {
            res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
  
})
app.get("/product",(req,res)=>{
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        errormessage:"PAGE NOT FOUND"
    })
})


app.listen(3000,() => {
    console.log("server is up on port 3000")
})