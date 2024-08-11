# restaurant-location-search-api 🍔🍹

A Node.js package that serves as an unofficial API wrapper, providing a unified interface to fetch restaurant locations from various chains without the need for Google Maps API, making it a cost-free solution. This package leverages the specific, unofficial APIs of supported restaurants such as McDonald's, Wendy's, Chipotle, Burger King, Popeyes, and Taco Bell, offering a simplified way to retrieve locations based on latitude and longitude. It's designed for developers who need to integrate restaurant location functionalities into their applications seamlessly, with plans to expand support to more restaurant chains in the future.


## Features

- Fetch the nearest or a list of restaurant locations based on coordinates.
- Supports multiple restaurant chains.
- Option to specify search radius and maximum number of results.
- Handles responses in various formats, including JSON and XML, automatically decoding compressed responses.
- Search sites for more info ( coming soon )

## Installation

Use npm to install `restaurant-location-search-api`:

```bash
npm install restaurant-location-search-api
```

## Usage

After installation, require the package in your Node.js project and use the functions provided to fetch restaurant locations.

```javascript
const getLocations = require('restaurant-location-search-api');

// Fetch nearest McDonald's location
getLocations('tacoBell', { lat: 40.712776, long: -74.005974 }, '1000', '1', true)
  .then(fetchedLocations => { console.log( fetchedLocations ) } )
  .catch(console.error);

// Fetch locations for other supported restaurants
getLocations('burgerKing', { lat: 40.712776, long: -74.005974 }, '5000', '5')
  .then(fetchedLocations => { console.log( fetchedLocations ) } )
  .catch(console.error);
```

## API

### `getLocations(spotName, geoObject, radius, maxResults, nearbyOnly=false)`

Fetches restaurant locations based on the specified parameters.

- **spotName**: Name of the restaurant chain (e.g., 'mcdonalds', 'wendys').
- **geoObject**: Object with `lat` (latitude) and `long` (longitude) properties.
- **radius**: Search radius in kilometers.
- **maxResults**: Maximum number of results to return.
- **nearbyOnly** (optional): Set to `true` to fetch only the nearest location. ( might not work for all restuarants )


## Example JSON Response

Below is an example of the JSON response returned by the `getLocations` function for Taco Bell locations:

```json
{
  "nearByStores": [
    {
      "storeStatus": "openNow",
      "pickupStoreStatusForLocation": "Activated",
      "phoneNumber": "+12122330848",
      "storeNumber": "035336",
      "timeZone": "GMT-05:00",
      "roundUpFlag": true,
      "todayBusinessHours": {
        "openTime": "07:00",
        "closeTime": "23:00"
      },
      "delivery": true,
      "address": {
        "streetAddress": "123 Example St",
        "city": "New York",
        "state": "NY",
        "zipCode": "10001"
      },
      "geoPoint": {
        "latitude": 40.712776,
        "longitude": -74.005974
      },
      "formattedDistance": "0.30 Miles"
    },
    {
      "storeStatus": "openNow",
      "pickupStoreStatusForLocation": "Activated",
      "phoneNumber": "+16468239315",
      "storeNumber": "035828",
      "timeZone": "GMT-05:00",
      "roundUpFlag": true,
      "todayBusinessHours": {
        "openTime": "07:00",
        "closeTime": "22:00"
      },
      "delivery": true,
      "address": {
        "streetAddress": "456 Another Rd",
        "city": "New York",
        "state": "NY",
        "zipCode": "10002"
      },
      "geoPoint": {
        "latitude": 40.715776,
        "longitude": -74.015974
      },
      "formattedDistance": "1.1 Miles"
    }
    // Additional stores omitted for brevity
  ]
}
```


## Supported Restaurants

- McDonald's
- Wendy's
- Chipotle
- Burger King
- Popeyes
- Taco Bell

More coming soon!

## Contributing

Contributions are welcome! If you'd like to add support for more restaurant chains or improve the package, please open a pull request.
