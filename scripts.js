window.addEventListener('load', () => {
   let long;
   let lat;
   let temperatureDescription = document.querySelector('.temperature-description');
   let temperatureDegree = document.querySelector('.temperature-degree');
   let locationTimeZone = document.querySelector('.location-timezone');
   let weatherIcon = document.querySelector('.icon');
   let temperatureSign = document.querySelector('.degree-section span');

   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
         long = position.coords.longitude;
         lat = position.coords.latitude;

         const proxy = 'https://cors-anywhere.herokuapp.com/';
         const api = `${proxy}http://api.weatherapi.com/v1/current.json?key=0753c8ff31574b7a9b4203227201510 &q=${lat},${long}`;

         fetch(api).then(response => {
            return response.json();
         }).then(data => {
            console.log(data);

            var temperature = data.current.temp_c;  // same as  const {temp_c} = data.current;
            const condition = data.current.condition.text;
            const location = data.location.name + ' , ' + data.location.region;
            const iconlink = data.current.condition.icon;

            temperatureDegree.textContent = temperature;
            temperatureDescription.textContent = condition;
            locationTimeZone.textContent= location;    
            weatherIcon.setAttribute("src", `${iconlink}`);
               var counter =0;
            document.querySelector('.degree-section').addEventListener('click', ()=> {
               if(counter%2==0)
               {
                  temperature = ((data.current.temp_c * 9) /5.0 ) + 32 ;
                  temperatureDegree.textContent = Math.floor(temperature) ;
                  temperatureSign.textContent='F';
               } 
               else{
                  temperatureDegree.textContent = data.current.temp_c;
                  temperatureSign.textContent='C';
               }
               counter++;
               console.log(counter);
             });
         });



      });

     
   } else {
      alert(" AYO !! GIVE ME PERMISSION DUDE.");
   }
});