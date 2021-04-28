import { svgIconDisplayName } from '@fluentui/react-icons-northstar';
import { mapSubscription } from '../../config';

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