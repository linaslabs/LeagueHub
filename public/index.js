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
        dateConverter(element.utcDate,element.homeTeam.name.replace(" FC",""),element.awayTeam.name.replace(" FC",""),
        element.homeTeam.crest,element.awayTeam.crest,'centre', true)
    }))
   
}

function dateConverter(date, homeTeam, awayTeam, homeTeamCrest, awayTeamCrest, divId, currentGameWeek){
    var fixtureTime = new Date(date)
    var homeTeam = decodeHTML(homeTeam)
    var awayTeam = decodeHTML(awayTeam)

    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'}
    var fixtureDateFormatted = fixtureTime.toLocaleDateString('en-GB', options)
    var fixtureTimeHours = fixtureTime.getHours().toString().padStart(2,'0')
    var fixtureTimeMinutes = fixtureTime.getMinutes().toString().padStart(2,'0')
    var fixtureText = document.createTextNode(" " + homeTeam + " " + fixtureTimeHours + ":" + fixtureTimeMinutes + " " + awayTeam + " ") 
    
    var fixture = document.createElement('p')
    var lineBreak = document.createElement('br')
    var line = document.createElement('hr')
    var fixtureTimeText = document.createTextNode(fixtureDateFormatted)

    var homeTeamCrestIMG = document.createElement('img')
    homeTeamCrestIMG.src = homeTeamCrest
    homeTeamCrestIMG.style.width = '25pt'
    homeTeamCrestIMG.style.height = '25pt'
    // alt text?

    var awayTeamCrestIMG = document.createElement('img')
    awayTeamCrestIMG.src = awayTeamCrest
    awayTeamCrestIMG.style.width = '25pt'
    awayTeamCrestIMG.style.height = '25pt'
    // alt text?
    fixture.appendChild(fixtureTimeText)
    fixture.appendChild(lineBreak)
    fixture.appendChild(homeTeamCrestIMG)
    fixture.appendChild(fixtureText)
    fixture.appendChild(awayTeamCrestIMG)

    if(currentGameWeek){
        
    }

    document.getElementById(divId).append(fixture)
    document.getElementById(divId).append(line)

}

// for converting '&' properly
function decodeHTML(html){
    var txt = document.createElement('textarea'); 
    txt.innerHTML = html;
    return txt.value;
}