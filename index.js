const express = require('express');
const app = express();

app.get("/", (req,res) => {
    res.send("Funcionou");
})
app.listen(3030, () => {
    console.log("App Running")
})