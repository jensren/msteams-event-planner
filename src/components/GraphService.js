// access Graph API

export async function getManager(client) {
  let directoryObject = await client.api('/me/manager')
    .get();

  return directoryObject;
}

export async function getMeetingTime(client) {

  const meetingTimeSuggestionsResult = {
    attendees: [
      {
        emailAddress:
          { address: 'jen-admin@globalsportstour.onmicrosoft.com', name: 'Jenny Ren' },
        type: 'Required'
      }
    ],
    timeConstraint: {
      timeslots: [
        {
          start: {
            dateTime: '2021-04-25T01:38:16.236Z',
            timeZone: 'Pacific Standard Time'
          },
          end: {
            dateTime: '2021-05-02T01:38:16.236Z',
            timeZone: 'Pacific Standard Time'
          }
        }]
    },
    locationConstraint:
    {
      isRequired: 'false',
      suggestLocation: 'true',
      locations: [{
        displayName: 'Conf Room 32/1368',
        locationEmailAddress: 'conf32room1368@imgeek.onmicrosoft.com'
      }]
    }, meetingDuration: 'PT1H'
  };

  return await client.api('/me/findMeetingTimes')
    .post(meetingTimeSuggestionsResult);
}