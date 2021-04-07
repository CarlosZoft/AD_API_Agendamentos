const config = require('config');
const configExpress = require('./config/configExpress');
app = configExpress()

app.get("/", (req,res) => {
    res.send("Funcionou");
})
app.listen(config.get('api.port'), () => {
    console.log("App Running")
})