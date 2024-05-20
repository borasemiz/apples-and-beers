# Apples and Beers

Welcome. In order to get started, you need to have `docker-compose`. Make sure you install it and its required componets.

On the root of this project directory, execute:

```sh
docker compose --env-file .env.example up --build
```

This will build the backend and the frontend. After it has successfuly been built, you will see something like this on the console:

```
Server is open to allow connections from anyone (0.0.0.0)
```

Afterwards, go to your browser and enter `http://localhost:3002/parcel/{id}`. Replace the parcel ID with either "1" or "2".

You can find the frontend code in the `app` directory.

## Notes

In this assignment, I've used NextJS as the base framework. I used Google Charts to show the timeline of the daily crop data. I found couple of libraries other than Google Charts, but I gave my decision to go with the Google Charts because of the following reasons:

- Relatively clear documentation.
- There is already a React port of the library and seemed to be well maintained.
- This React port also supported TypeScript. On the other hand, the other libraries simply didn't.
- This library also provided an NPM package. The other choices simply provided a CDN that can be used with a `script` tag.
