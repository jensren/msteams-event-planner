import { mapSubscription } from '../../config';
import * as atlas from 'azure-maps-control';

export async function addressSearch(address) {
  // takes address string and returns the latitude and longitude

  const url = new URL("https://atlas.microsoft.com/search/address/json");
  url.search = new URLSearchParams({
    "subscription-key": mapSubscription, 
    "api-version": "1.0", 
    "query": address,
  });

  let fetchResult = await (await fetch(url)).json();
  return fetchResult.results[0].position;
}

export function getMidpoint(origin, destination, fraction) {
  // return Position that is fraction from origin to destination
  const pos1 = new atlas.data.Position(origin.lon, origin.lat);
  const pos2 = new atlas.data.Position(destination.lon, destination.lat);
  const result = atlas.math.interpolate(pos1, pos2, fraction)
  return result;
}