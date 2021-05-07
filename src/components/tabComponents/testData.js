

export function meetingTimeSuggestionsResult(self, manager) {
  return {
    attendees: [
      {
        emailAddress:
          { address: self.mail, name: self.displayName },
        type: 'Required'
      },
      {
        emailAddress:
          { address: manager.mail, name: manager.displayName },
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


export const selfLocation = {
  streetNumber: 30,
  streetName: "Hudson St",
  municipality: "Jersey City",
  postalCode: "07302",
  countryCode: "USA"
};
export const managerLocation = {
  streetNumber: 10,
  streetName: "Hudson Yards",
  municipality: "New York City",
  postalCode: "10001",
  countryCode: "USA"
};
export const fraction = 0.6;
export const poiQuery = "RESTAURANT";

export function meetingInfo(self, manager, time, poi) {
  if (poi) {
    return ({
      subject: 'Lunch Meeting',
      body: {
        contentType: 'HTML',
        content: `Let's go for lunch! Does ${time.text} at ${poi.name} work for you?`
      },
      start: time.start,
      end: time.end,
      location: {
        displayName: poi.name,
        address: {
          "city": poi.city,
          "countryOrRegion": poi.country,
          "postalCode": poi.postalCode,
          "state": poi.state,
          "street": poi.street
        },
        coordinates: {
          "latitude": poi.position.lat,
          "longitude": poi.position.lon
        },
        locationType: "restaurant"
      },
      attendees: [
        {
          emailAddress:
            { address: self.mail, name: self.displayName },
          type: 'Required'
        },
        {
          emailAddress:
            { address: manager.mail, name: manager.displayName },
          type: 'Required'
        }
      ],
    });
  }
  return ({
    subject: 'Lunch Meeting',
    body: {
      contentType: 'HTML',
      content: `Does ${time.text} work for you?`
    },
    start: time.start,
    end: time.end,
    attendees: [
      {
        emailAddress:
          { address: self.mail, name: self.displayName },
        type: 'Required'
      },
      {
        emailAddress:
          { address: manager.mail, name: manager.displayName },
        type: 'Required'
      }
    ],
  });
}