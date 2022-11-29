const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { useField } = require("formik");
const app = express();

app.use(bodyParser.urlencoded({expanded:true}));
app.use(express.static(__dirname + '/'));

app.get("/", function(req,res){
res.sendFile(__dirname + "/signup.html")

})



app.post("/", function(req,res){

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    // console.log(firstName,lastName,email);
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
        };
        const jsonData = JSON.stringify(data);

const url = " https://us21.api.mailchimp.com/3.0/lists/d7294f832e";
const options ={
method:"POST",
auth: "sang:4692e05a94910e7e204534bd4345c555-us21"
}
        const request = https.request(url, options, function(response){

            if(response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
            }
                else{
                    res.sendFile(__dirname + "/failure.html");
                }
            response.on("data", function(data){
                console.log(JSON.parse(data));
            })
        })
// request.write(jsonData);
request.end();

});



app.post("/failure",function(req,res){

    res.redirect("/");
})





app.listen(3000, function(){
    console.log("sangeetha");
})

// api key
// 4692e05a94910e7e204534bd4345c555-us21

// list
// d7294f832e