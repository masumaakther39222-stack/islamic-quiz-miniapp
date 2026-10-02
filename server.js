require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let quizzes = [
  {id:1, question:"ইসলামের প্রথম স্তম্ভ কোনটি?", options:["সালাত","সাওম","শাহাদাহ","যাকাত"], answer:2},
  {id:2, question:"এক দিনে ফরজ নামাজ কত ওয়াক্ত?", options:["৩","৪","৫","৬"], answer:2},
  {id:3, question:"পবিত্র কুরআন কোন মাসে নাজিল শুরু হয়?", options:["শাবান","রমজান","শাওয়াল","মুহররম"], answer:1}
];

let users = {};

app.get("/api/quizzes", (req,res)=>res.json(quizzes));

app.post("/api/score", (req,res)=>{
  const {telegramId, name, points=0} = req.body || {};
  if(!telegramId) return res.status(400).json({error:"telegramId required"});
  if(!users[telegramId]) users[telegramId]={telegramId,name:name||"User",points:0};
  users[telegramId].points += Number(points)||0;
  res.json(users[telegramId]);
});

app.get("/api/leaderboard",(req,res)=>{
  res.json(Object.values(users).sort((a,b)=>b.points-a.points).slice(0,20));
});

function admin(req,res,next){
  if(req.headers["x-admin-key"] !== process.env.ADMIN_KEY)
    return res.status(401).json({error:"Unauthorized"});
  next();
}

app.post("/api/admin/quiz", admin, (req,res)=>{
  const q=req.body;
  if(!q.question || !Array.isArray(q.options) || q.options.length<2)
    return res.status(400).json({error:"Invalid quiz"});
  const item={id:Date.now(),question:q.question,options:q.options,answer:Number(q.answer)||0};
  quizzes.push(item);
  res.json(item);
});

app.delete("/api/admin/quiz/:id", admin, (req,res)=>{
  quizzes=quizzes.filter(q=>q.id!==Number(req.params.id));
  res.json({ok:true});
});

app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));

app.listen(process.env.PORT||3000,()=>console.log("Mini App running"));
