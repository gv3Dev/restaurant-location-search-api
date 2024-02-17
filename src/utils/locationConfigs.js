function getLocationConfigs(geoObject, radius='8.045', maxResults = '30') {
    return {
        mcdonalds: {
            params: {
                latitude: geoObject.lat,
                longitude: geoObject.long,
                radius,
                maxResults,
                country: 'us',
                language: 'en-us',
            },
            apiUrl: `https://www.mcdonalds.com/googleappsv2/geolocation`,
            method: 'GET'
        },
        wendys: {
            params: {
                lang: 'en',
                cntry: 'US',
                sourceCode: 'ORDER.WENDYS',
                version: '23.0.1',
                radius,
                lat: geoObject.lat,
                long: geoObject.long,
            },
            apiUrl: `https://api.app.prd.wendys.digital/web-client-gateway/LocationServices/rest/nearbyLocations`,
            method: 'GET'
        },
        chipotle: {
            params: {
                "latitude":geoObject.lat,
                "longitude":geoObject.long,
                "radius": Math.round(Number(radius)),
                "restaurantStatuses":["OPEN","LAB"],
                "conceptIds":["CMG"],
                "orderBy":"distance",
                "orderByDescending":false,
                "pageSize": Number(maxResults),
                "pageIndex":0,
                "embeds":{
                    "addressTypes":["MAIN"],
                    "realHours":true,
                    "directions":true,
                    "catering":true,
                    "onlineOrdering":true,
                    "timezone":true,
                    "marketing":true,
                    "chipotlane":true,
                    "sustainability":true,
                    "experience":true
                }
            },
            apiUrl: `https://services.chipotle.com/restaurant/v3/restaurant`,
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': `b4d9f36380184a3788857063bce25d6a`,
                'Accept': 'application/json, text/plain, */*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,de;q=0.7',
                'Chipotle-CorrelationId': 'OrderWeb-ce70e430-8e25-4546-b8c1-57afdd514a94',
                'Connection': 'keep-alive',
                'Content-Type': 'application/json',
                'Host': 'services.chipotle.com',
                'Origin': 'https://www.chipotle.com',
                'Referer': 'https://www.chipotle.com/',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-site',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"',
            }
        },
        popeyes: {
            params: {
                operationName: 'GetRestaurantsV2',
                variables: JSON.stringify({
                    input: {
                        filter: "NEARBY",
                        coordinates: {
                            userLat: geoObject.lat,
                            userLng: geoObject.long,
                            searchRadius: Math.round(Number(radius))
                        },
                        first: Number(maxResults),
                        status: "OPEN"
                    }
                }),
                extensions: JSON.stringify({
                    persistedQuery: {
                        version: 1,
                        sha256Hash: "05c231a96351360e01af3a4159a83ff551d5d37e9743b1b78cb2885682e7cc60"
                    }
                })
            },
            apiUrl: `https://use1-prod-plk-gateway.rbictg.com/graphql`,
            method: 'GET'
        },
        burgerKing: {
            params:{
                operationName: 'GetRestaurants',
                query: `query GetRestaurants($input: RestaurantsInput) {
                    restaurants(input: $input) {
                      pageInfo {
                        hasNextPage
                        endCursor
                        __typename
                      }
                      totalCount
                      nodes {
                        ...RestaurantNodeFragment
                        __typename
                      }
                      __typename
                    }
                  }
              
                  fragment OperatingHoursFragment on OperatingHours {
                    friClose
                    friOpen
                    monClose
                    monOpen
                    satClose
                    satOpen
                    sunClose
                    sunOpen
                    thrClose
                    thrOpen
                    tueClose
                    tueOpen
                    wedClose
                    wedOpen
                    __typename
                  }
              
                  fragment RestaurantNodeFragment on RestaurantNode {
                    _id
                    storeId
                    isAvailable
                    posVendor
                    chaseMerchantId
                    curbsideHours {
                      ...OperatingHoursFragment
                      __typename
                    }
                    deliveryHours {
                      ...OperatingHoursFragment
                      __typename
                    }
                    diningRoomHours {
                      ...OperatingHoursFragment
                      __typename
                    }
                    distanceInMiles
                    drinkStationType
                    driveThruHours {
                      ...OperatingHoursFragment
                      __typename
                    }
                    driveThruLaneType
                    email
                    environment
                    franchiseGroupId
                    franchiseGroupName
                    frontCounterClosed
                    hasBreakfast
                    hasBurgersForBreakfast
                    hasCatering
                    hasCurbside
                    hasDelivery
                    hasDineIn
                    hasDriveThru
                    hasMobileOrdering
                    hasParking
                    hasPlayground
                    hasTakeOut
                    hasWifi
                    hasLoyalty
                    id
                    isDarkKitchen
                    isFavorite
                    isHalal
                    isRecent
                    latitude
                    longitude
                    mobileOrderingStatus
                    name
                    number
                    parkingType
                    phoneNumber
                    physicalAddress {
                      address1
                      address2
                      city
                      country
                      postalCode
                      stateProvince
                      stateProvinceShort
                      __typename
                    }
                    playgroundType
                    pos {
                      vendor
                      __typename
                    }
                    posRestaurantId
                    restaurantImage {
                      asset {
                        _id
                        metadata {
                          lqip
                          __typename
                        }
                        __typename
                      }
                      __typename
                    }
                    restaurantPosData {
                      _id
                      __typename
                    }
                    status
                    vatNumber
                    __typename
                  }`,
                  variables: {
                    input: {
                      filter: "NEARBY",
                      coordinates: {
                        userLat: geoObject.lat,
                        userLng: geoObject.long,
                        searchRadius: Math.round(Number(radius))
                      },
                      first: Number(maxResults),
                      status: "OPEN"
                    }
                  }
                  
            },
            apiUrl: `https://use1-prod-bk-gateway.rbictg.com/graphql`,
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,de;q=0.7',
                'Apollographql-Client-Name': 'wl-rn-web',
                'Apollographql-Client-Version': '7.15.0-no-uid-75bf31f',
                'Content-Type': 'application/json',
                'Origin': 'https://www.bk.com',
                'Sec-Ch-Ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
                'Sec-Ch-Ua-Mobile': '?0',
                'Sec-Ch-Ua-Platform': '"macOS"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                'X-Forter-Token': '2d0340551f3d41cb8f62b44fdc914eca_1708125028167__UDF43-m4_13ck_tt'
              },
              responseType: 'arraybuffer'
        },
        tacoBell: {
            params:{
                latitude: geoObject.lat,
                longitude: geoObject.long,
            },
            apiUrl: `https://www.tacobell.com/tacobellwebservices/v4/tacobell/stores`,
            method: `GET`
        }
    };
}

module.exports = getLocationConfigs;
