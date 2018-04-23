const { test } = require("ava");
const Mongoose = require("mongoose");

const app = require("../index.js");


test.beforeEach(async (t) => {
  t.context.Server = await app();
});

test("check status", async (t) => {
  const response = await t.context.Server.inject("/status");
  t.is(response.statusCode, 200);
});


test("register user", async (t) => {
  const userData = { name: "Ankit Bahuguna", email: "ankiit.bahuguna@gmail.com", password: "123456789" };
  await register(userData, t);
});

test("login should fail with incorrect password", async (t) => {
  const request = {
    method: "POST",
    url: "/users/login",
    payload: JSON.stringify({ email: "ankiit.bahuguna@gmail.com", password: "incorrectpassword" }),
  };
  const response = await t.context.Server.inject(request);
  t.is(response.statusCode, 403);
  t.is(typeof response.result, "object");
  t.is(Object.prototype.hasOwnProperty.call(response.result, "token"), false);
});

test("authentication", async (t) => {
  const request = {
    method: "GET",
    url: "/users/profile",
    headers: JSON.stringify({ authorization: "bearer incorrectasseccesstoekn" }),
  };
  const response = await t.context.Server.inject(request);
  t.is(response.statusCode, 401);
  t.is(typeof response.result, "object");
});

test("Get users", async (t) => {
  const response = await t.context.Server.inject("/users");
  t.is(response.statusCode, 200);
  t.is(Array.isArray(response.result), true);
});


test("Test register -> profile -> login -> profile Flow", async (t) => {
  const userDetails = {
    name: "Ankit Bahuguna",
    email: "ankiit.bahuguna@yahoo.com",
    password: "123456789",
  };
  const initialToken = await register(userDetails, t);

  const registeredUser = await profile(initialToken, t);

  const token = await login({ email: userDetails.email, password: userDetails.password }, t);

  const profileDetails = await profile(token, t);

  t.deepEqual(registeredUser, profileDetails);
  // console.log(profileResponse);
});

async function register(data, t) {
  const registrationData = {
    method: "POST",
    url: "/users/register",
    payload: JSON.stringify(data),
  };
  const registrationResponse = await t.context.Server.inject(registrationData);
  t.is(registrationResponse.statusCode, 201);
  t.is(typeof registrationResponse.result, "object");
  t.is(Object.prototype.hasOwnProperty.call(registrationResponse.result, "token"), true);

  return registrationResponse.result.token;
}

async function login(data, t) {
  const loginData = {
    method: "POST",
    url: "/users/login",
    payload: JSON.stringify(data),
  };

  const response = await t.context.Server.inject(loginData);
  t.is(response.statusCode, 200);
  t.is(typeof response.result, "object");
  t.is(Object.prototype.hasOwnProperty.call(response.result, "token"), true);

  return response.result.token;
}

async function profile(token, t) {
  const profileRequest = {
    method: "GET",
    url: "/users/profile",
    headers: { authorization: `bearer ${token}` },
  };
  const profileResponse = await t.context.Server.inject(profileRequest);

  t.is(profileResponse.statusCode, 200);
  t.is(typeof profileResponse.result, "object");
  t.is(typeof profileResponse.result.profile, "object");
  return profileResponse.result.profile;
}

test.after.always("Clean up test database", async () => {
  await Mongoose.connection.db.dropDatabase();
});
