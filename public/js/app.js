const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const image = document.querySelector('img');

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();
    
    const location = search.value;
    messageOne.textContent = `Searching weather info of ${location}`;
    messageTwo.textContent = 'Loading...';
    messageThree.textContent = '';
    image.style.display = 'none';

    fetch(`/weather?address=${location}`).then((response) => {
       response.json().then((data) => {
            if (data.error){
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
                messageThree.textContent = '';
            }  else {
                messageOne.textContent = `It is ${data.forecast.weather_descriptions} in ${location}`;
                messageTwo.textContent = `it's currently ${data.forecast.temperature} degree and feels like ${data.forecast.feelslike} degree outside.`;
                messageThree.textContent = data.location;
                image.style.display = 'block';
                image.src = data.forecast.weather_icons;
            }
       });
    });
})