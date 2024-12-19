function teamMatches(teamid, name){
    var teamID={
        id:teamid.toString()
    }

    var loaderIcon = document.querySelector('.loader')
    var centreElement = document.getElementById('centre');

    centreElement.replaceChildren(loaderIcon) // Deletes all elements that are children of centre div and only keeps the loader

    loaderIcon.className = "loader" // Sets the loader to visible

    // fetching team fixtures for the rest of the season
    fetch('/teamMatches',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(teamID)
    })
    .then(response => response.json())
    .then(data => {
        loaderIcon.classList.add("loader--hidden") // Hides loader

        var teamHeading = document.createElement('h2');
        teamHeading.textContent = "Scheduled games for " + name;
        centreElement.appendChild(teamHeading); // Adds a heading to show what team was selected and what their games are

        (data.matches).forEach(match => {
        fixtureAppender(match,'centre') // Adds each match dynamically to the page
    })})
    .then(error => console.log(error))
}

function fixtureAppender(match, divId){
    // Formats date and time into correct format
    var fixtureDate = formatDate(match.utcDate)
    var fixtureTime = formatTime(match.utcDate)
    // Textnodes for the date and time
    var fixtureDateText = document.createTextNode(fixtureDate)
    var fixtureTimeText = document.createTextNode(fixtureTime)
    
    // Declares variables and nodes to append to final node in order to dynamically display content
    var homeTeamText = document.createTextNode(" " + match.homeTeam.shortName)
    var awayTeamText = document.createTextNode(match.awayTeam.shortName + " ") 
    
    // Main elements for nodes to be appended to, these elements will be the final ones put on the page
    var dateParagraph = document.createElement('p')
    var fixture = document.createElement('p')
    var line = document.createElement('hr')
    
    // Creates divs to partition the elements of a fixture so flexbox can be used (so time can be centred consistently)
    var divTeams = document.createElement('div') // Container for the elements
    var divHomeTeam = document.createElement('div')
    var divAwayTeam = document.createElement('div')
    var divTime = document.createElement('div')
    divTeams.className = "teams"
    divHomeTeam.className = "homeTeam"
    divAwayTeam.className = "awayTeam"
    divTime.className = "timeOrScore"

    // Creates the images of the crests of both home and away teams, sets their properties
    var homeTeamCrestIMG = document.createElement('img')
    homeTeamCrestIMG.src = match.homeTeam.crest
    homeTeamCrestIMG.style.width = '25pt'
    homeTeamCrestIMG.style.height = '25pt'
    homeTeamCrestIMG.alt = "crest"

    var awayTeamCrestIMG = document.createElement('img')
    awayTeamCrestIMG.src = match.awayTeam.crest
    awayTeamCrestIMG.style.width = '25pt'
    awayTeamCrestIMG.style.height = '25pt'
    awayTeamCrestIMG.alt = "crest"

    // Adding all the nodes in order to create the DOM
    dateParagraph.appendChild(fixtureDateText)
    fixture.appendChild(dateParagraph)

    divHomeTeam.appendChild(homeTeamCrestIMG)
    divHomeTeam.appendChild(homeTeamText)

    divTime.appendChild(fixtureTimeText)

    divAwayTeam.appendChild(awayTeamText)
    divAwayTeam.appendChild(awayTeamCrestIMG)

    divTeams.appendChild(divHomeTeam)
    divTeams.appendChild(divTime)
    divTeams.appendChild(divAwayTeam)

    fixture.appendChild(divTeams)

    document.getElementById(divId).append(fixture)
    document.getElementById(divId).append(line)

}

// Function to format the date into shorthand easier to read
function formatDate(date){
    var dateFormatted = new Date(date)
    const optionsDate = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'}  
    return dateFormatted.toLocaleDateString('en-GB', optionsDate)
}

// Function to format the time into 24hour and easier to read
function formatTime(time){
    var timeFormatted = new Date(time)
    const optionsTime = { hour: '2-digit', minute: '2-digit'}  
    return timeFormatted.toLocaleTimeString('en-GB', optionsTime)
}
