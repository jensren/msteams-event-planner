

export function meetingTimeSuggestionsResult(self, manager, timeZone) {
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
            dateTime: '2021-05-31T12:00',
            timeZone: timeZone
          },
          end: {
            dateTime: '2021-05-31T14:00',
            timeZone: timeZone
          }
        },
        {
          start: {
            dateTime: '2021-06-01T12:00',
            timeZone: timeZone
          },
          end: {
            dateTime: '2021-06-01T14:00',
            timeZone: timeZone
          }
        },
        {
          start: {
            dateTime: '2021-06-02T12:00',
            timeZone: timeZone
          },
          end: {
            dateTime: '2021-06-02T14:00',
            timeZone: timeZone
          }
        },
        {
          start: {
            dateTime: '2021-06-03T12:00',
            timeZone: timeZone
          },
          end: {
            dateTime: '2021-06-03T14:00',
            timeZone: timeZone
          }
        },
        {
          start: {
            dateTime: '2021-06-04T12:00',
            timeZone: timeZone
          },
          end: {
            dateTime: '2021-06-04T14:00',
            timeZone: timeZone
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
  let info = ({
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
  console.log("meetingInfo:", info);
  return info;
}