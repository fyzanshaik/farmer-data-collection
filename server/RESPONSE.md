## Data format to send
```
{
  "name": "John Doe",
  "relationInfo": "S/O Robert Doe",
  "gender": "MALE",
  "community": "GENERAL",
  "aadharNumber": "123456789012",
  "state": "Telangana",
  "district": "Hyderabad",
  "mandal": "Secunderabad",
  "village": "Example Village",
  "panchayat": "Example Panchayat",
  "dob": "1990-01-01",
  "age": 33,
  "contact": "9876543210",
  "bankDetails": {
    "ifscCode": "SBIN0123456",
    "branchName": "Example Branch",
    "address": "Branch Address",
    "bankName": "State Bank of India",
    "bankCode": "SBI001"
  },
  "fields": [
    {
      "geoTag": {
        "latitude": 17.385044,
        "longitude": 78.486671
      },
      "surveyNumber": "123/A",
      "areaInHa": 2.5,
      "yieldEstimate": 1000.0
    },
    {
      "geoTag": {
        "latitude": 17.385044,
        "longitude": 78.486671
      },
      "surveyNumber": "123/B",
      "areaInHa": 1.5,
      "yieldEstimate": 750.0
    }
  ]
}
```