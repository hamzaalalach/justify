# justify
Made for Tictactrip, coding challenge

Hosted at: [justify](https://hmjustify.herokuapp.com/)

# RUNNING THE PROJECT
- Install the required dependencies:

  `yarn install`
  
- Running the server:

  `yarn dev` or `yarn start`
 
Decicated port: `5000`

Please note that running with `yarn dev` will lead to active tokens being cleared more often, as they're only stored in memory.

# API REFERENCE

API is hosted at `/api/`

## API error codes:
  - 400: bad request
  - 404: resource not found
  - 401: unauthorized
  - 402: payment required
  - 500: internal server error
  - 200: ok


## Endpoints:
  - POST `/justify`
  - POST `/token`

### POST `/justify`
  - Returns the sent text justified.
  - Request data: text/plain.
  - Request headers: Bearer authorization token.
  - Response sample:
  ```JSON
   {
    "success": true,
    "data": "Justified text"
   }
   ```
   
### POST `/token`
  - Returns a unique token for the given email address.
  - Request data:
    - email: String
  - Response sample:
  ```JSON
    {
     "success": true,
     "token": "5b12a3d4112ed4c8e86ff6023550b289798cc0a3"
    }
  ```
  
 
# DATA STORE:
  Generale structure:
  ```JSON
    {
      "email1": {
        "token": "secret",
        "count": 200
      },
      "email2": {}
    }
  ```
  
  - token: String, hash generated by the `crypto` module.
  - count: Numver, used to keep count of words for rate limiting.
  
# Bonuses:
- Tests: Used jest for testing, supertest for testing the api. `yarn test`
- Coverage: Used jest to generate coverage information. `yarn coverage`
- Code readability: Used inline comments when necessary, code is modularized, used design patterns: Module and Singleton.

# Extras:
- CI/CD using TravisCI, auto deployment to Heroku, secret key encrypted using the travis gem.
