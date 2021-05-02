export function meetingTimeSuggestionsResult(manager) {
  return {
    attendees: [
      {
        emailAddress:
          { address: 'jen-admin@globalsportstour.onmicrosoft.com', name: 'Jenny Ren' },
        type: 'Required'
      },
      {
        emailAddress:
          { address: manager.mail, name: manager.displayName},
        type: 'Required'
      }
    ],
    timeConstraint: {
      timeslots: [
        {
          start: {
            dateTime: '2021-05-03T16:00Z',
            timeZone: 'UTC'
          },
          end: {
            dateTime: '2021-05-03T18:00Z',
            timeZone: 'UTC'
          }
        },
        {
          start: {
            dateTime: '2021-05-04T16:00Z',
            timeZone: 'UTC'
          },
          end: {
            dateTime: '2021-05-04T18:00Z',
            timeZone: 'UTC'
          }
        },
        {
          start: {
            dateTime: '2021-05-05T16:00Z',
            timeZone: 'UTC'
          },
          end: {
            dateTime: '2021-05-05T18:00Z',
            timeZone: 'UTC'
          }
        },
        {
          start: {
            dateTime: '2021-05-06T16:00Z',
            timeZone: 'UTC'
          },
          end: {
            dateTime: '2021-05-06T18:00Z',
            timeZone: 'UTC'
          }
        },
        {
          start: {
            dateTime: '2021-05-07T16:00Z',
            timeZone: 'UTC'
          },
          end: {
            dateTime: '2021-05-07T18:00Z',
            timeZone: 'UTC'
          }
        },
      ]
    },
    locationConstraint:
    {
      isRequired: 'false',
      suggestLocation: 'false',
      locations: []
    }, meetingDuration: 'PT1H30M'
  };
}


export const selfLocation = "30 Hudson St Jersey City, NJ 07302";
export const managerLocation = "10 Hudson Yards New York, NY 1000";
export const fraction = 0.6;
export const poiQuery = "RESTAURANT";