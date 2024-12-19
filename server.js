const express = require('express')

// express app
const app = express()

// register view engine
app.set('view engine', 'ejs')
app.set('views', 'public') // changing views folder to the public folder

const path = require('path')
// const cors = require('cors')
const standingsApi = "http://api.football-data.org/v4/competitions/PL/standings"
const apiToken = "a8c7a2fb7ec9423c88904885ed9d082c"

// Makes sure express can read json
app.use(express.json())

// Code to fix CORS error if necessary
// app.use(
//     cors({
//     origin: "http://127.0.0.1:3000",
//     })
// )

// Main get request to render the homepage and send variables about the standings and the gameweek data
app.get('/', async (req,res) =>{
    const standingsPL = await fetch(standingsApi, {
        headers:{
            "X-Auth-Token" : apiToken,
        }
    })
    const standingData = await standingsPL.json()
    const gameWeek = standingData["season"]["currentMatchday"] 
    

    const gameWeekMatches = await fetch(`http://api.football-data.org/v4/competitions/2021/matches?matchday=${gameWeek}`, {
        headers:{
            "X-Auth-Token" : apiToken,
        }
    })
    const gameWeekMatchesData = await gameWeekMatches.json()
    
    var variables = {
        standings: standingData,
        gameWeek : gameWeekMatchesData,
    }
    res.render('index', variables)
})

// Getting team id sent from front end about which team matches to fetch, then returning the data
app.post('/teamMatches', async (req,res) =>{
    const response = await fetch(`https://api.football-data.org/v4/teams/${req.body.id}/matches?status=SCHEDULED`,{
        headers:{
            "X-Auth-Token" : apiToken,
        }
    })
    const data = await response.json()
    res.send(data)
})

// Making css and js files public so we can use them with index.ejs
app.use(express.static(path.join(__dirname,'public')))

// Verifying the web server is running
app.listen(3000, () => console.log("Running server on port 3000"))
