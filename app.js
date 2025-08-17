
import http, { createServer } from "http";

const app = createServer((req,res)=>{
    res.end("Hello sunil");
})

app.listen(5000,()=>{
    console.log("Server is running at port 5000...");
})