// access Azure Maps API

import { mapSubscription } from '../../config';
import { math, data } from 'azure-maps-control';  // azure-maps-control is also known as atlas in the Microsoft docs
import { Coords } from './MapController';


type InputAddress = {
  streetNumber: number | string,
  streetName: string,
  municipality: string,
  postalCode: string,  // no spaces
  countryCode: string  // using ISO standard codes
};

type POIAddress = {
  "name": string,
  "address": string,
  "position": data.Position,
  "city": string,
  "country": string,
  "postalCode": string,
  "state": string,
  "street": string,
};


export async function addressSearch(address: InputAddress): Promise<Coords> {
  // returns the most probable latitude and longitude, according to the search results

  const url = new URL("https://atlas.microsoft.com/search/address/structured/json");
  url.search = new URLSearchParams({
    "subscription-key": mapSubscription,
    "api-version": "1.0",
    "countryCode": address.countryCode,
    "municipality": address.municipality,
    "postalCode": address.postalCode,
    "streetName": address.streetName,
    "streetNumber": address.streetNumber.toString(),
  }).toString();

  const fetchResult = await (await fetch(url.toString())).json();
  return fetchResult.results[0].position;
}


export function getMidpoint(origin: Coords, destination: Coords, fraction: number): data.Position {
  // return Position that is fraction from origin to destination
  // e.g. if fraction is 0.6, then 60% of the distance is from origin, 40% from destination
  const pos1 = new data.Position(origin.lon, origin.lat);
  const pos2 = new data.Position(destination.lon, destination.lat);
  const result = math.interpolate(pos1, pos2, fraction)
  return result;
}

export async function poiSearch(lon: number, lat: number, query: string): Promise<POIAddress> {
  // center is around specified longitude and latitude, query is the type of POI desired

  const url = new URL("https://atlas.microsoft.com/search/poi/category/json");
  url.search = new URLSearchParams({
    "subscription-key": mapSubscription,
    "api-version": "1.0",
    "query": query,
    "lat": lat.toString(),
    "lon": lon.toString(),
    "limit": "6",
  }).toString();

  const fetchResult = await (await fetch(url.toString())).json();

  let ret = fetchResult.results.map((item: any) => (
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