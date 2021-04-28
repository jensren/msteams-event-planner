// access Graph API

export async function getManager(client) {
  let directoryObject = await client.api('/me/manager')
    .get();

  return directoryObject;
}

export async function getMeetingTime(client, meetingTimeSuggestionsResult) {
  return await client.api('/me/findMeetingTimes')
    .post(meetingTimeSuggestionsResult);
}