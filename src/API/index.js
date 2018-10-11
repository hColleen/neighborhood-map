class Helper{
    static baseURL(){
        return 'https://api.foursquare.com/v2'
    }
    static auth(){
        const keys = {
            client_id: "JKLNY4U2KT3FAS2L2AHI50NEEO0BHAY0A004ALOQEEBS5AIW",
            client_secret: "A5ZD1JNOSWUQ0MKYLOV0B1F03YK1PW2CLWPDL45VYPPSQA2W",
            v: "20182507"
        }
        return Object.keys(keys)
        .map(key => `${key}=${keys[key]}`)
        .join("&");
    }

    static urlBuilder(urlParameters){
        if (!urlParameters){
            return ''
        }
        return Object.keys(urlParameters)
            .map(key => `${key}=${urlParameters[key]}`)
            .join("&")
    }
    static headers() {
        return{
            Accept: 'application/json'
        }
    }
    static simpleFetch(endpoint,method,urlParameters){
        let requestData = {
            method,
            headers: Helper.headers()
        }
        return fetch(
            `${Helper.baseURL()}${endpoint}?${Helper.auth()}&${Helper.urlBuilder(urlParameters)}`,
            requestData
        ).then(res => res.json())
    }
}

export default class SquareAPI{
    static search(urlParameters){
        return Helper.simpleFetch("/venues/search/", "GET", urlParameters)
    }
    static getVenueDetails(VENUE_ID){
        return Helper.simpleFetch(`/venues/${VENUE_ID}`,"GET")
    }
    static getVenuPhoto(VENUE_ID){
        return Helper.simpleFetch(`/venues/VENUE_ID/photos`, "GET")
    }
}