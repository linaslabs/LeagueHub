function teamMatches(element){
    var elementID={
        id:element.toString()
    }

    // removes all children of centre div
    var centreElement = document.getElementById('centre')
    while(centreElement.firstChild){
        centreElement.removeChild(centreElement.firstChild)
    }

    fetch('http://localhost:3000/teamMatches',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(elementID)
    })
    .then(response => response.json())
    .then(data => data.forEach(match => {
        dateConverter(match,'centre')
    }))
   
}

function dateConverter(match, divId){
    // var fixtureTime = new Date(match.utcDate)

    // const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'}
    // var fixtureDateFormatted = fixtureTime.toLocaleDateString('en-GB', options)
    // var fixtureTimeHours = fixtureTime.getHours().toString().padStart(2,'0')
    // var fixtureTimeMinutes = fixtureTime.getMinutes().toString().padStart(2,'0')

    var fixtureDate = formatDate(match.utcDate)
    var fixtureTime = formatTime(match.utcDate)
    
    var homeTeamText = document.createTextNode(" " + match.homeTeam.name.replace(" FC",""))
    var awayTeamText = document.createTextNode(" " + match.awayTeam.name.replace(" FC", "")) 
    
    var dateParagraph = document.createElement('p')
    var fixture = document.createElement('p')
    var line = document.createElement('hr')
    
    var divTeams = document.createElement('div')
    var divHomeTeam = document.createElement('div')
    var divAwayTeam = document.createElement('div')
    var divTime = document.createElement('div')

    divTeams.className = "teams"
    divHomeTeam.className = "homeTeam"
    divAwayTeam.className = "awayTeam"
    divTime.className = "timeOrScore"

    var fixtureDateText = document.createTextNode(fixtureDate)
    var fixtureTimeText = document.createTextNode(fixtureTime)

    var homeTeamCrestIMG = document.createElement('img')
    homeTeamCrestIMG.src = match.homeTeam.crest
    homeTeamCrestIMG.style.width = '25pt'
    homeTeamCrestIMG.style.height = '25pt'
    // alt text?

    var awayTeamCrestIMG = document.createElement('img')
    awayTeamCrestIMG.src = match.awayTeam.crest
    awayTeamCrestIMG.style.width = '25pt'
    awayTeamCrestIMG.style.height = '25pt'
    // alt text?

    dateParagraph.appendChild(fixtureDateText)
    fixture.appendChild(dateParagraph)

    divHomeTeam.appendChild(homeTeamCrestIMG)
    divHomeTeam.appendChild(homeTeamText)

    divTime.appendChild(fixtureTimeText)

    divAwayTeam.appendChild(awayTeamCrestIMG)
    divAwayTeam.appendChild(awayTeamText)

    divTeams.appendChild(divHomeTeam)
    divTeams.appendChild(divTime)
    divTeams.appendChild(divAwayTeam)

    fixture.appendChild(divTeams)

    document.getElementById(divId).append(fixture)
    document.getElementById(divId).append(line)

}

function formatDate(date){
    var dateFormatted = new Date(date)
    const optionsDate = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'}  
    return dateFormatted.toLocaleDateString('en-GB', optionsDate)
}

function formatTime(time){
    var timeFormatted = new Date(time)
    const optionsTime = { hour: '2-digit', minute: '2-digit'}  
    return timeFormatted.toLocaleTimeString('en-GB', optionsTime)
}
