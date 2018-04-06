
### What is this repository for? ###

Hapi-17 project that uses JWT, Swagger and Glue along with mongodb and redis to store data.

For JWT authentication I am using https://www.npmjs.com/package/@now-ims/hapi-now-auth, as this is the only plugin
that seems to work with Hapi 17.

The JWT tokens are stored in Redis, while the user data in stored in MongoDB.

### How do I get set up? ###

npm install && npm start

To check swagger documentation visit http://127.0.0.1:3000/documentation


### Running with Docker

docker-compose up --build