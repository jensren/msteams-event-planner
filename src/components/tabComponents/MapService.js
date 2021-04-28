import { mapSubscription } from '../../config';

export async function addressSearch(address) {
  // takes address string and returns the lagitude and longitude
  let url = `https://atlas.microsoft.com/search/address/json?subscription-key=${mapSubscription}&api-version=1.0&query=${encodeURIComponent(address)}`;

  let fetchResult = await (await fetch(url)).json();
  try {
    let ret = fetchResult.results[0].position;
    return ret;
  } catch {
    console.log("Could not get coordinates from address search");
    console.log("Fetch result: ", fetchResult);
  }
}