import { mapSubscription } from '../../config';
// import * as atlas from 'azure-maps-control';
import { math, data } from 'azure-maps-control';

export async function addressSearch(address) {
  // takes address string and returns the latitude and longitude

  const url = new URL("https://atlas.microsoft.com/search/address/structured/json");
  url.search = new URLSearchParams({
    "subscription-key": mapSubscription,
    "api-version": "1.0",
    "countryCode": address.countryCode,
    "municipality": address.municipality,
    "postalCode": address.postalCode,
    "streetName": address.streetName,
    "streetNumber": address.streetNumber,
  });

  const fetchResult = await (await fetch(url)).json();
  return fetchResult.results[0].position;
}


export function getMidpoint(origin, destination, fraction) {
  // return Position that is fraction from origin to destination
  const pos1 = new data.Position(origin.lon, origin.lat);
  const pos2 = new data.Position(destination.lon, destination.lat);
  const result = math.interpolate(pos1, pos2, fraction)
  return result;
}


export async function poiSearch(lon, lat, query) {
  const url = new URL("https://atlas.microsoft.com/search/poi/category/json");
  url.search = new URLSearchParams({
    "subscription-key": mapSubscription,
    "api-version": "1.0",
    "query": query,
    "lat": lat,
    "lon": lon,
    "limit": 6,
  });

  const fetchResult = await (await fetch(url)).json();

  let ret = fetchResult.results.map(item => (
    {
      "name": item.poi.name,
      "address": item.address.freeformAddress,
      "position": item.position,
      "city": item.address.municipality,
      "country": item.address.country,
      "postalCode": item.address.postalCode,
      "state": item.address.countrySubdivision,
      "street": item.address.streetNumber + " " + item.address.streetName,
    }
  ));

  return ret;
}