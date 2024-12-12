const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const standingsApi = "http://api.football-data.org/v4/competitions/PL/standings"
const apiToken = "a8c7a2fb7ec9423c88904885ed9d082c"

// Probably dont need this anymore
app.use(
    cors({
    origin: "http://127.0.0.1:3000",
    })
)

app.get('/api/standings',async (req,res) =>{
    const response = await fetch(standingsApi, {
        headers:{
            "X-Auth-Token" : apiToken,
        }
    })
    const data = await response.json()
    res.json(data)
})

app.use(express.static(path.join(__dirname,'public')))


app.listen(3000, () => console.log("Running server on port 3000"))


// error page not found?
// app.use((req,res) =>{
//     res.status(404).sendFile("./public/404.html", { root: __dirname})
// })