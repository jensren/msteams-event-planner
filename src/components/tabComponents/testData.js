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
            dateTime: '2021-04-28T11:00Z',
            timeZone: 'UTC'
          },
          end: {
            dateTime: '2021-04-28T13:00Z',
            timeZone: 'UTC'
          }
        },
        {
          start: {
            dateTime: '2021-04-29T11:00Z',
            timeZone: 'UTC'
          },
          end: {
            dateTime: '2021-04-29T13:00Z',
            timeZone: 'UTC'
          }
        },
        {
          start: {
            dateTime: '2021-04-30T11:00Z',
            timeZone: 'UTC'
          },
          end: {
            dateTime: '2021-04-30T13:00Z',
            timeZone: 'UTC'
          }
        },
        {
          start: {
            dateTime: '2021-05-03T11:00Z',
            timeZone: 'UTC'
          },
          end: {
            dateTime: '2021-05-03T13:00Z',
            timeZone: 'UTC'
          }
        }
      ]
    },
    locationConstraint:
    {
      isRequired: 'false',
      suggestLocation: 'false',
      locations: []
    }, meetingDuration: 'PT1H'
  };
}


export const selfLocation = "30 Hudson St Jersey City, NJ 07302";
export const managerLocation = "10 Hudson Yards New York, NY 1000";