const { test } = require("ava");
const app = require("../index.js");


test.beforeEach(async (t) => {
  t.context.Server = await app();
});

test("check status", async (t) => {
  const response = await t.context.Server.inject("/status");
  t.is(response.statusCode, 200);
});


test("register user", async (t) => {
  const request = {
    method: "POST",
    url: "/users/register",
    payload: JSON.stringify({ name: "Ankit Bahuguna", email: "ankiit.bahuguna@gmail.com", password: "123456789" }),
  };
  const response = await t.context.Server.inject(request);
  t.is(response.statusCode, 201);
  t.is(typeof response.result, "object");
  t.is(Object.prototype.hasOwnProperty.call(response.result, "token"), true);
});

test("login user", async (t) => {
  const request = {
    method: "POST",
    url: "/users/login",
    payload: JSON.stringify({ email: "ankiit.bahuguna@gmail.com", password: "Cogito@123" }),
  };
  const response = await t.context.Server.inject(request);
  t.is(response.statusCode, 200);
  t.is(typeof response.result, "object");
  t.is(Object.prototype.hasOwnProperty.call(response.result, "token"), true);
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
