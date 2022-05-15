let chartCanv = document.querySelector('#chart')
const asia = document.querySelector('#asia')
const europe = document.querySelector('#europe')
const africa = document.querySelector('#africa')
const americas = document.querySelector('#americas')

let chartX
let data
let countries
let loading = false
let lastCode

getCountriesList()



//RULES
//1.dont do anything without getting the data
//2.get avialbales contries

//GET Countries FUNCTION
 //1. get avialbales contries
 //2. assain contries with continue 

async function getCountriesList(){
    

    //get available countries
    await fetch('https://api.covid19api.com/countries')
        .then(res => res.json()).then(res => countries = res );
        console.log(countries)

    //assain contries with continue    
    countries.forEach(country => country.continent = parse(country.ISO2))
    countries.forEach(country => {
        const newButton = document.createElement('button');
        console.log(country)
        newButton.innerHTML = country.Country
        newButton.setAttribute('id', country.ISO2)
        newButton.onclick = () => getData(country.ISO2)
        if(country.continent === "asia"){
            asia.appendChild(newButton)
        }else if(country.continent === "africa"){
            africa.appendChild(newButton)
        }else if(country.continent === "europe"){
            europe.appendChild(newButton)
        }else if(country.continent === "americas"){
            americas.appendChild(newButton)
        }
    })
}

//FUNCTION GetData
async function getData(code){
    if(loading) return

    try{
        document.getElementById(lastCode).classList.remove('selected')
    }catch(e){

    }
    lastCode = code
    const currentButton =  document.getElementById(code)
    currentButton.classList.add('selected')

    const now = new Date();
    const yesterday = new Date();
    yesterday.setHours(0, 0, 0, 0)
    yesterday.setDate(yesterday.getDate() - 1)
    loading = true
    await fetch(`https://api.covid19api.com/country/${code}?from=${yesterday.toISOString()}&to=${now.toISOString()}`)
    .then(res => res.json())
    .then(res => {
        loading = false
        console.log(res)
        const labels = res.map(e => e.Date);
        console.log(res)
        const data = {
            labels: labels,
            datasets: [{
               label: 'Active',
               backgroundColor: 'rgb(255, 99, 132)',
               borderColor: 'rgb(255, 99, 132)',
               data: res.map(e => e.Active),
            },
            {
                label: 'Confirmed',
                backgroundColor: 'rgb(32, 99, 132)',
                borderColor: 'rgb(32, 99, 132)',
                data: res.map(e => e.Confirmed),
             },
             {
                label: 'Deaths',
                backgroundColor: 'rgb(10, 10, 10)',
                borderColor: 'rgb(10, 10, 10)',
                data: res.map(e => e.Deaths),
             }
            ]
        };
        
        const config = {
            type: 'line',
            data: data,
            options: {}
        };
        

        destoryChart()
        createChart()
     
        function destoryChart(){
            if(chartX){
                chartX.destroy();
            }
        }
        function createChart(){
            chartX = new Chart(
                chartCanv,
                config
            )
            console.log('chart created',chartX)
        }
        
        
    });   
}
//WORLD Cases FUCNTION
 //1. fill chart with all world coutnries chart

//ASIA Cases FUNCTION


 //EUR Casea FUNCTION 


 //africa CAses Function


 //Oceania CAses Function


//America Cases FUNCTION

function parse(code){
    const list = {
        "asia": ["AF", "AM", "AZ", "BH", "BD", "BT", "BN", "KH", "CN", "HK", "MO", "CY", "KP", "GE", "IN", "ID", "IR", "IQ", "IL", "JP", "JO", "KZ", "KW", "KG", "LA", "LB", "MY", "MV", "MN", "MM", "NP", "OM", "PK", "PH", "QA", "KR", "SA", "SG", "LK", "PS", "SY", "TJ", "TH", "TL", "TR", "TM", "AE", "UZ", "VN", "YE"],
        "europe": ["AX", "AL", "AD", "AT", "BY", "BE", "BA", "BG", "HR", "CZ", "DK", "EE", "FO", "FI", "FR", "DE", "GI", "GR", "GG", "VA", "HU", "IS", "IE", "IM", "IT", "JE", "LV", "LI", "LT", "LU", "MT", "MC", "ME", "NL", "MK", "NO", "PL", "PT", "MD", "RO", "RU", "SM", "RS", "SK", "SI", "ES", "SJ", "SE", "CH", "UA", "GB"],
        "africa": ["DZ", "AO", "BJ", "BW", "RW", "BF", "BI", "CV", "CM", "CF", "TD", "KM", "CG", "CI", "CD", "DJ", "EG", "GQ", "ER", "SZ", "ET", "TF", "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY", "MG", "MW", "ML", "MR", "MU", "YT", "MA", "MZ", "NA", "NE", "NG", "RE", "RW", "SH", "ST", "SN", "SC", "SL", "SO", "ZA", "SS", "SD", "TG", "TN", "UG", "TZ", "EH", "ZM", "ZW"],
        "oceania": ["AS", "AU", "CX", "CC", "CK", "FJ", "PF", "GU", "HM", "KI", "MH", "FM", "NR", "NC", "NZ", "NU", "NF", "MP", "PW", "PG", "PN", "WS", "SB", "TK", "TO", "TV", "VU", "WF"],
        "americas": ["AI", "AG", "AW", "BS", "BB", "BZ", "BM", "BQ", "VG", "CA", "KY", "CR", "CU", "CW", "DM", "DO", "SV", "GL", "GD", "GP", "GT", "HT", "HN", "JM", "MQ", "MX", "MS", "NI", "PA", "PR", "BL", "KN", "LC", "MF", "PM", "VC", "SX", "TT", "TC", "US", "VI", "AR", "BO", "BV", "BR", "CL", "CO", "EC", "FK", "GF", "GY", "PY", "PE", "GS", "SR", "UY", "VE"]
    }
    
    for(con of Object.keys(list)){
        if(list[con].includes(code)){
            return con
        }
    }
    return null
} 
