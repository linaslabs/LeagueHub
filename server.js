const express = require('express')

// express app
const app = express()

// register view engine
app.set('view engine', 'ejs')
app.set('views', 'public') // changing views folder to the public folder

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

// backend api relay
// app.get('/api/standings',async (req,res) =>{
//     const response = await fetch(standingsApi, {
//         headers:{
//             "X-Auth-Token" : apiToken,
//         }
//     })
//     const data = await response.json()
//     res.json(data)
// })

// rendering index.ejs on homepage

app.get('/', async (req,res) =>{
    const response = await fetch(standingsApi, {
        headers:{
            "X-Auth-Token" : apiToken,
        }
    })
    const data = await response.json()

    res.render('index', { standings: data["standings"][0]["table"]})
})

// making css and js files public so we can use them with index.ejs
app.use(express.static(path.join(__dirname,'public')))


app.listen(3000, () => console.log("Running server on port 3000"))


// error page not found? uses ejs
// app.use((req,res) =>{
//     res.status(404).render('404')
// })