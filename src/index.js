// mcdonaldApi.js
const axios = require('axios');
const zlib = require('zlib');
const calculateDistance = require('./utils/calculateDistance');
const getLocationConfigs = require('./utils/locationConfigs');
const responseParse = require(`./utils/parser`);

async function getLocations(spotName, geoObject, radius, maxResults, nearbyOnly=false){

    const locations = getLocationConfigs(geoObject, radius, maxResults);

    if(locations.hasOwnProperty(spotName)){
        let selectedSpot = locations[spotName];
        if(nearbyOnly){
            selectedSpot.params.maxResults= "1";
            selectedSpot.params.pageSize=`1`;
        }
        try{
            let response;
            if(selectedSpot.method=="GET"){
                const queryString = Object.entries(selectedSpot.params)
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(typeof value === 'object' ? JSON.stringify(value) : value)}`)
                .join('&'); const url = `${selectedSpot.apiUrl}?${(queryString)}`;
                response = await axios.get(url);
            }else if(selectedSpot.method == "POST"){
                response = await axios.post(selectedSpot.apiUrl, selectedSpot.params, {
                    responseType: selectedSpot.responseType||'json',
                    headers: selectedSpot.headers
                });
            }
            if (response) {
                const encoding = response.headers['content-encoding'];
                const type = response.headers['content-type'];
                if(type.includes('application/xml')){
                    return responseParse(response);
                }
                let decompressedData;
                if (encoding === 'br') {
                  decompressedData = JSON.parse(zlib.brotliDecompressSync(Buffer.from(response.data)).toString());
                } else {
                  decompressedData = response.data; 
                }
                return decompressedData;
            } else {
                throw new Error('No locations found');
            }
        }catch(e){
            console.log(e);
        }
    }else{
        return `( ${spotName} ) - this spot isn't supported (yet). Could be a spelling mistake on your part tho...`;
    }
}

module.exports = getLocations;








  
 
  





 