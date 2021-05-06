// access Graph API

export async function getSelf(client) {
  return await client.api('/me')
	  .get();
}

export async function getManager(client) {
  return await client.api('/me/manager')
    .get();
}

export async function getMeetingTime(client, meetingTimeSuggestionsResult) {
  return await client.api('/me/findMeetingTimes')
    .post(meetingTimeSuggestionsResult);
}