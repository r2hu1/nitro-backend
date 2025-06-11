import {
  defineEventHandler,
  getMethod,
  getRequestHeader,
  setResponseHeaders,
} from "h3";

export default defineEventHandler((event) => {
  // accepting requests from any origin
  // TODO: Implement CORS for specific origins of your need
  const origin = "*";

  setResponseHeaders(event, {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  });

  console.log("[CORS] headers set");

  if (getMethod(event) === "OPTIONS") {
    event.node.res.statusCode = 204;
    event.node.res.end();
    return;
  }

  return;
});
