require('dotenv').config()
const configExpress = require('./config/configExpress');
app = configExpress()

app.get("/", (req,res) => {
    res.send("Funcionou");
})
app.listen(process.env.API_PORT, () => {
    console.log("App Running")
})