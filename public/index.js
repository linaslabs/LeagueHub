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
    .then(data => data.forEach(element => {
        console.log(data)

        var fixtureTime = new Date(element.utcDate)
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'}
        var fixtureDateFormatted = fixtureTime.toLocaleDateString('en-GB', options)
        var fixtureTimeHours = fixtureTime.getHours().toString().padStart(2,'0')
        var fixtureTimeMinutes = fixtureTime.getMinutes().toString().padStart(2,'0')

        var lineBreak = document.createElement('br')
        var fixture = document.createElement('p')
        var line = document.createElement('hr')

        var homeTeam = element.homeTeam.name.replace(" FC","")
        var homeTeamCrest = document.createElement('img')
        homeTeamCrest.src = element.homeTeam.crest
        homeTeamCrest.style.width = '25pt'
        homeTeamCrest.style.height = '25pt'
        // alt text?
        var awayTeam = element.awayTeam.name.replace(" FC","")
        var awayTeamCrest = document.createElement('img')
        awayTeamCrest.src = element.awayTeam.crest
        awayTeamCrest.style.width = '25pt'
        awayTeamCrest.style.height = '25pt'
        // alt text?
        var fixtureText = document.createTextNode(" " + homeTeam + " " + fixtureTimeHours + ":" + fixtureTimeMinutes + " " + awayTeam + " ") 
        var fixtureTimeText = document.createTextNode(fixtureDateFormatted)
        fixture.appendChild(fixtureTimeText)
        fixture.appendChild(lineBreak)
        fixture.appendChild(homeTeamCrest)
        fixture.appendChild(fixtureText)
        fixture.appendChild(awayTeamCrest)
        document.getElementById('centre').append(fixture)
        document.getElementById('centre').append(line)
    }))
   
}