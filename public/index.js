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
        var fixture = document.createElement('p')
        
        var homeTeamCrest = document.createElement('img')
        homeTeamCrest.src = element.homeTeam.crest
        homeTeamCrest.style.width = '16pt'
        homeTeamCrest.style.height = '16pt'
        // alt text?
        var awayTeamCrest = document.createElement('img')
        awayTeamCrest.src = element.awayTeam.crest
        awayTeamCrest.style.width = '16pt'
        awayTeamCrest.style.height = '16pt'
        // alt text?
        var fixtureText = document.createTextNode(element.homeTeam.name + " vs " + element.awayTeam.name) 
        fixture.appendChild(homeTeamCrest)
        fixture.appendChild(fixtureText)
        fixture.appendChild(awayTeamCrest)
        document.getElementById('centre').append(fixture)
    }))
   
}