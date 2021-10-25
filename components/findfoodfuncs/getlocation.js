export async function getLocation(successCallback, rejectionCallback){



    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    
    function success(pos) {
        var crd = pos.coords;
        console.log('Your current position is:');
        // console.log(`Latitude : ${crd.latitude}`);
        // console.log(`Longitude: ${crd.longitude}`);
        // console.log(`More or less ${crd.accuracy} meters.`);
        successCallback( [crd.latitude, crd.longitude] )
        
    }
    
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        rejectionCallback()
    }
    
    //const coords = await navigator.geolocation.getCurrentPosition(success, error, options);
    await navigator.geolocation.getCurrentPosition(success, error, options);
    // console.log(coords)

}