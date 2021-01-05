
const input = document.querySelector('.input')
const inputBtn = document.querySelector('.inputBtn')

const city = document.querySelector('.city')
const today = document.querySelector('.today')
const myDate = document.querySelector('.myDate')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')
const image = document.querySelector('img')
const instruction=document.querySelector('.instruction')



const takeInput=()=>{
    if(input.value!=''){
        takeApi();
        document.querySelector('.now').classList.remove('blur');
        instruction.textContent="Wpisz miasto"
        instruction.style.color='white'
    }
}



const takeApi=()=>{
    const domain = 'https://api.openweathermap.org/data/2.5/weather?q='

    
    let cityName= input.value;
    const apiKey='&appid=99a69da468869ccadc707f7ab58b0ac7'
    const units = '&units=metric';
    const url=domain+cityName+apiKey+units;
    city.textContent=cityName.toUpperCase();
    

    axios.get(url)
    .then(res => {
        temperature.textContent=Math.round(res.data.main.temp)+'˚';
        humidity.textContent= res.data.main.humidity+'%';
        checkCloud(res.data.weather[0].id);
        city.textContent=cityName.toUpperCase()+', '+res.data.sys.country;
        
        
        
    })
    .catch(()=>{
        instruction.textContent="Wpisz poprawnie miasto"
        instruction.style.color='tomato'
        document.querySelector('.now').classList.add('blur');
    })//warning.textContent= 'Wpisz poprawną nazwe miasta')
    
}


const takeDay=()=>{
    let d = new Date();
    d= d.getDay();
    switch(d){
        case 1:
            today.textContent='Poniedziałek';
            break;
        case 2:
            today.textContent='Wtorek';
            break;
        case 3:
            today.textContent='Środa';
            break;
        case 4:
            today.textContent='Czwartek';
            break;
        case 5:
            today.textContent='Piątek';
            break;
        case 6:
            today.textContent='Sobota';
            break;
        case 0:
            today.textContent='Niedziela';
            break;
    }

}
takeDay();

const takeDate=()=>{
    let d = new Date();
    let day = d.getDate();
    if(day<10){day='0'+day};
    let month = d.getMonth()+1
    if(month<10){month='0'+month};
    let year = d.getFullYear()
    myDate.textContent=`${day}/${month}/${year}`
}
takeDate();

const checkCloud=(code) =>{
    if (code>=200 && code<300) {
        image.setAttribute('src','cloud1.png')
    }else if (code>=300 && code<400) {
        image.setAttribute('src','cloud2.png')
    }else if (code>=500 && code<600) {
        image.setAttribute('src','cloud3.png')
    }else if (code>=600 && code<700) {
        image.setAttribute('src','cloud4.png')
    }else if (code>=700 && code<800) {
        image.setAttribute('src','cloud5.png')
    }else if (code==800) {
        image.setAttribute('src','cloud6.png')
    }else if (code>=801 && code<=802) {
        image.setAttribute('src','cloud7.png')
    }else if (code>=803 && code<=804) {
        image.setAttribute('src','cloud8.png')
    }else{
        image.setAttribute('src','cloud.png')
    }
};



inputBtn.addEventListener('click', takeInput);
input.addEventListener('keyup', function(){
    if(event.keyCode=='13'){takeInput()};
});



