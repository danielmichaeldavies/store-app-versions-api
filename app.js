import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

// Express Setup
const app = express();
const port = 3000;

// Add CORS middleware to allow other-origin requests
app.use(cors());

// Little middleware to make sure the request has an auth header
app.use((req, res, next) => {
  if (!req.headers.authorization) {
    res.status(403).json({ error: 'No credentials sent!' });
    return;
  }

  next();
});

// Extract auth header from incoming request, use it in a Connect API request, forward body
app.get('/apps', async (req, res) => {
  try {
    const { authorization } = req.headers;
    const response = await fetch('https://api.appstoreconnect.apple.com/v1/apps?include=appStoreVersions,preReleaseVersions', {
      headers: {
        Authorization: authorization,
      },
    });

    console.log(response);
    const data = await response.text();
    console.log(data);

    res.send(data);
  } catch (error) {
    console.error(error);

    res.status(500).send('Broken.');
  }
});

app.get('/app/:appId', async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { appId } = req.params;

    const response = await fetch(`https://api.appstoreconnect.apple.com/v1/apps/${appId}`, {
      headers: {
        Authorization: authorization,
      },
    });

    console.log(response);
    const data = await response.text();
    console.log(data);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Broken.');
  }
});

app.listen(port, () => {
  console.log(`AppStoreAPI UP on port ${port}`);
});
