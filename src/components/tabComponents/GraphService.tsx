// access Microsoft Graph API
// note: Graph API requires signed in user

import { Client } from '@microsoft/microsoft-graph-client';


type Attendee = {
  emailAddress:
  { address: string, name: string },
  type: 'required' | 'optional' | 'resource'  // 'required' or 'optional' for person, 'resource' for resource
};

type Time = {
  dateTime: string,  // 'yyyy-mm-ddThh:mm'
  timeZone: string   // long form, e.g. 'Eastern Standard Time'
}

export type TimeSlot = {
  start: Time
  end: Time
};

type Location = {
  displayName: string,
  locationEmailAddress: string
}

export type MeetingTimeSuggestions = {
  attendees: Array<Attendee>,
  timeConstraint: {
    timeslots: Array<TimeSlot>
  },
  locationConstraint:
  {
    isRequired: 'true' | 'false',
    suggestLocation: 'true' | 'false',
    locations: Array<Location>
  }, meetingDuration: string  // 'PThHmmM', where h is hours and mm is minutes and capital letters are not changed
};

export type MeetingInfo = {
  subject: string,
  body: {
    contentType: 'HTML'
    content: string
  },
  start: Time
  end: Time
  attendees: Array<Attendee>,
  location?: {
    displayName: string,
    address: {
      "city": string,
      "countryOrRegion": string,
      "postalCode": string,
      "state": string,
      "street": string
    },
    coordinates: {
      "latitude": number,
      "longitude": number
    },
    locationType: string
  },
};


export async function getSelf(client: Client): Promise<any> {
  // get basic information about user, include name and profile picture
  return await client.api('/me')
    .get();
}

export async function getManager(client: Client): Promise<any> {
  // get basic information about the user's manager
  return await client.api('/me/manager')
    .get();
}

export async function getTimezone(client: Client): Promise<any> {
  // get the user's timezone, according to their Microsoft account settings
  let t = await client.api('/me/mailboxsettings')
    .get();
  console.log("timezone:", t.timezone);
  return t.timeZone;
}

export async function getMeetingTime(client: Client, meetingTimeSuggestionsResult: MeetingTimeSuggestions, timeZone: string): Promise<any> {
  // get potential meeting times based on desired timeslots and attendee availability
  // meeting times are sorted based on maximum attendance of required attendees
  return await client.api('/me/findMeetingTimes')
    .header("Prefer", `outlook.timezone="${timeZone}"`)
    .post(meetingTimeSuggestionsResult);
}

export async function scheduleMeeting(client: Client, meetingInfo: MeetingInfo): Promise<any> {
  // add meeting to the user's calendar and invite other attendees via calendar (pending event) and email notification
  return await client.api('/me/events')
    .post(meetingInfo);
}