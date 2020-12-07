var map;
function initMap(){
    var sjr={
        lat:20.3975129,
        lng:-99.9846499
    };
    var aurrera={
        lat:20.394841,
        lng:-99.984629
    }
    var wallmart={
        lat:20.398709,
        lng:-99.982000
    }
    var sams={
        lat:20.4050242,
        lng:-99.9830729
    }
    map =new google.maps.Map(document.getElementById("map"),{
        center: sjr,
        zoom:15

    });

    markerAurrera=new google.maps.Marker({
        position: aurrera,
        map     : map,
        title   : 'Aurrera',
        icon    : './public/images/logos/aurrera.png',
        //width   : '200'
    });

    infoWindowAurrera = new google.maps.InfoWindow({
        content :`
        <h1>Aurrera</h1><br>
        <p>Aurrera</p><br>
        <img src='./public/images/logos/aurrera.png'><br>
        <a href="https://www.bodegaaurrera.com.mx/">Sitio web</a>
        `
    });
    google.maps.event.addListener(markerAurrera,'click',function(){
        infoWindowAurrera.open(map,markerAurrera);
    });

/// WALLMART
markerWallmart=new google.maps.Marker({
    position: wallmart,
    map     : map,
    title   : 'Wallmart',
    icon    : './public/images/logos/wallmart.png',
    //width   : '200'
});

infoWindowWallmart = new google.maps.InfoWindow({
    content :`
    <h1>Wallmart</h1><br>
    <p>Wallmart</p><br>
    <img src='./public/images/logos/wallmart.png'><br>
    <a href="https://www.wallmart.com.mx/">Sitio web</a>
    `
});
google.maps.event.addListener(markerWallmart,'click',function(){
    infoWindowWallmart.open(map,markerWallmart);
});

/// SAMS
markerSams=new google.maps.Marker({
    position: sams,
    map     : map,
    title   : 'Sams',
    icon    : './public/images/logos/sams.png',
    //width   : '200'
});

infoWindowSams = new google.maps.InfoWindow({
    content :`
    <h1>Sams</h1><br>
    <p>Sams</p><br>
    <img src='./public/images/logos/sams.png'><br>
    <a href="https://www.sams.com.mx/">Sitio web</a>
    `
});
google.maps.event.addListener(markerSams,'click',function(){
    infoWindowSams.open(map,markerSams);
});


}