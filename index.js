import express from "express";
import "dotenv/config";
const app = express();
const PORT = process.env.PORT;
console.log(PORT);
(function name(params) {
    
})
app.get("/", (req, res) => {
  res.send("Severs is running on " + PORT);
});

app.listen(PORT, () => console.log("Sever is running on " + PORT));
