// funktion för att lägga in child elements och skriva ut result variable
const add_childElements = (element, result, cities) => {
    const li = document.createElement('li')

    element.appendChild(li)
    li.setAttribute('style', 'list-style-type: none')
    li.innerHTML += result
    
    // Kollar om variable cities är inte undefault och lägger in <ul> för städer efter varje land
    if(cities){
        li.appendChild(cities)
    }
}



// Fetch - länder
fetch('land.json')
.then(response => response.json())
.then(data => data.map(country => {
    const countries = document.getElementById('country') 
    const cities = document.createElement('ul') 
    const result =  `${country.countryname.toUpperCase()}` 
    
    add_childElements(countries, result, cities) 
    
    // Fetch - städer
    fetch('stad.json')
    .then(response => response.json())
    .then (data => data.sort( (a, b) => b.population - a.population )) // Sorterar städer från högst till lägst
    .then(data => data.map(city => {
        const result = `${city.stadname}: ${city.population} invånare`

        if(country.id == city.countryid){ // Matchar ländernas id i städer.json
            add_childElements(cities, result)
        }
        
     }))
}))