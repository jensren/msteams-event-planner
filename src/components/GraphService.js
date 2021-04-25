// access Graph API

export async function getManager(client) {
  let directoryObject = await client.api('/me/manager')
    .get();
  
  return directoryObject;
}