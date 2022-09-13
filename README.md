# App Store API

## Context

This is just a little something as a proof-of-concept.

Origially I wrote a Gatsby app that queried the App Store Connect API to list the current release versions of apps for a certain team. But when it came to test it... it didn't work. The Connect API doesn't put an Access-Control-Allow-Origin header on the pre-flight check, so it can't be requested via browser JS.

Enter this. This is a very simple proxy that receives requsts that are already populated with the App Store Connect JWT and forwards that request to the Connect API. In this fashion, I don't have to worry about leaving details of my company's apps on a public endpoint.