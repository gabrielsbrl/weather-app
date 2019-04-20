window.addEventListener('load', () => {

    let long;
    let lat;

    let temperatureSection = document.querySelector('.temperature-section');
    let temperatureSpan = document.querySelector('.temperature-section span');
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    /**
     * https://api.darksky.net/forecast/27bc2059ad6c68677b6de22db7224a4a/37.8267,-122.4233
     */

    if(navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/27bc2059ad6c68677b6de22db7224a4a/${lat},${long}`;

            fetch(api)
                .then(res => res.json())
                .then(data => {

                    const { temperature, summary, icon } = data.currently;

                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;                    
                    locationTimezone.textContent = data.timezone.replace(/_/g, " ");
                    setIcon(icon, document.querySelector('.icon'));

                    temperatureSection.addEventListener('click', e => {

                        if(temperatureSpan.textContent === 'F') {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = toCelcius(temperature).toFixed(2);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }

                    });

                })  
                .catch(err => console.log(err))
        })

    } else {
        document.querySelector('h1').textContent = "You need to allow the geolocation to that we can tell u the temperature!";
    }

    function setIcon(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    function toCelcius(farenheit) {
        return (farenheit - 32) * (5 / 9);
    }

});