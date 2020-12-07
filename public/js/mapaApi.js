
        //hola
        var map;
        function initMap(){
            var sjr={
                lat:20.3975129,
                lng:-99.9846499
            };
            map =new google.maps.Map(document.getElementById("map"),{
                center: sjr,
                zoom:15
        
            });               
        
            var universidad={
                    lat:20.391437,
                    lng:-99.9717081
            }
            markeruniversidad=new google.maps.Marker({
                position: universidad,
                map     : map,
                title   : 'universidad',
                icon    : './public/images/logos/aurrera.png',
                //width   : '200'
            });
            infoWindowuniversidad = new google.maps.InfoWindow({
                content :`
                <h1>universidad</h1><br>
                <p>universidad</p><br>
                <img src='./public/images/logos/aurrera.png'><br>
                <a href="https://www.bodegaaurrera.com.mx/">Sitio web</a>
                `
            });
            google.maps.event.addListener(markeruniversidad,'click',function(){
                infoWindowuniversidad.open(map,markeruniversidad);
            });            
            
            var sjr={
                    lat:20.3948662,
                    lng:-99.9865561
            }
            markersjr=new google.maps.Marker({
                position: sjr,
                map     : map,
                title   : 'sjr',
                icon    : './public/images/logos/aurrera.png',
                //width   : '200'
            });
            infoWindowsjr = new google.maps.InfoWindow({
                content :`
                <h1>sjr</h1><br>
                <p>sjr</p><br>
                <img src='./public/images/logos/aurrera.png'><br>
                <a href="https://www.bodegaaurrera.com.mx/">Sitio web</a>
                `
            });
            google.maps.event.addListener(markersjr,'click',function(){
                infoWindowsjr.open(map,markersjr);
            });            
            }