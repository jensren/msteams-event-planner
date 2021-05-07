// access Graph API

export async function getSelf(client) {
  return await client.api('/me')
	  .get();
}

export async function getManager(client) {
  return await client.api('/me/manager')
    .get();
}

export async function getTimezone(client) {
  let t = await client.api('/me/mailboxsettings')
	  .get();
  return t.timeZone;
}

export async function getMeetingTime(client, meetingTimeSuggestionsResult, timeZone) {
  return await client.api('/me/findMeetingTimes')
    .header("Prefer", `outlook.timezone="${timeZone}"`)
    .post(meetingTimeSuggestionsResult);
}

export async function scheduleMeeting(client, meetingInfo) {
  return await client.api('/me/events')
    .post(meetingInfo);
}