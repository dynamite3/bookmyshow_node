import express, { request, response } from"express";
import {MongoClient,ObjectId} from "mongodb";
import dotenv from "dotenv";
import cors from "cors";



const app=express();
dotenv.config();

const PORT=process.env.PORT;
const MONGO_URL=process.env.MONGO_URL



app.use(cors())
app.use(express.json());

app.get("/",(request,response)=>{
    response.send("Hello from Express JS")
})

app.listen(PORT,()=>console.log("server started"))


async function createConnection(){
    const client=new MongoClient(MONGO_URL)
    await client.connect();
    return (client)
  }


app.get("/admin",async(request,response)=>{

    const client=await createConnection()
    const result=await client
       .db("bookmyshow")
       .collection("theater")
       .find({})
       .toArray();
    response.send(result)
   })

app.post("/admin",async(request,response)=>{
    const userData=request.body;
    console.log(userData)
    const client=await createConnection()
    const result=await client
        .db("bookmyshow")
        .collection("theater")
        .insertMany(userData)
    response.send(result)
  })

  app.get("/admin/:id",async(request,response)=>{
    const {id}=request.params
    
    const client=await createConnection()
    const result=await client
        .db("bookmyshow")
        .collection("theater")
        .find({})
        .toArray();
    
    const k=result.filter((e)=> e._id == id)
    response.send(k.length < 1 ? "not found":k)

})

app.delete("/admin/:id",async(request,response)=>{
    const {id}=request.params
    const client=await createConnection()
    const result=await client
        .db("bookmyshow")
        .collection("theater")
        .deleteOne({_id:ObjectId(id)})
    response.sendStatus(200)
})


app.put("/admin/:id",async(request,response)=>{
    const {id}=request.params
    const userData=request.body;
    const client=await createConnection()
    const result=await client
    .db("bookmyshow")
    .collection("theater")
    .updateOne({_id:ObjectId(id)},{$set:userData})
    response.send(result)
})


app.get("/client",async(request,response)=>{

    const client=await createConnection()
    const result=await client
       .db("bookmyshow")
       .collection("theater")
       .find({})
       .toArray();
    response.send(result)
   })


app.put("/client",async(request,response)=>{
    
    const userData=request.body;
    var seats=userData[0]
    var id=userData[1]
    var seattt=userData[2]
    if(seats.length>0){
    seats=seats.map(e=>e.toString())
    // console.log(seats)
    // console.log(id)
    // console.log(seattt)

    var j=0;
    for(var i=0;i<seats.length;i++)
    {
        var tp=+seats[j]
        var obj={}
        obj[tp]=true
        seattt[tp-1]=obj;
        j++;
    }
    // console.log(seattt)

    const client=await createConnection()
    const result=await client
    .db("bookmyshow")
    .collection("theater")
    // .find()
    .updateOne({_id:ObjectId(id)},{$set:{seats:seattt }})
    response.send(result)
    }
})


// app.get("/client/:id",async(request,response)=>{
//     const {id}=request.params
//     const client=await createConnection()
//     const result=await client
//        .db("bookmyshow")
//        .collection("theater")
//        .find({_id:ObjectId(id)})
//        .toArray();
//     response.send(result)
//     console.log(result)
//    })





