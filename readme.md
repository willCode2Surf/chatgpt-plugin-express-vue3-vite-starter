# chatgpt-plugin-express-vue3-vite-starter

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/willcode)

# ChatGPT Weather Plugin

This is a starter ChatGPT plugin that focuses on weather data. The possibilities are endless with what can be accomplished and this example is a fully functional prototype that you can use with ChatGPT 4!

This project takes the basic TODO applications and gives it some real context with integrations of real world APIs.

This project was rapidly developed using [vue3-vite-express-js-boilerplate](https://github.com/willCode2Surf/vue3-vite-express-js-boilerplate)

# Prerequisites

For this to work properly you will need the following:

1.  ChatGPT Plugin Developer Access; apply here if you do not have it yet: [chatgpt-plugins](https://openai.com/blog/chatgpt-plugins)
2.  OpenWeather API access for their Weather API. 1,000 FREE Calls a day is perfect. You will need an account and an API key. [openweather](https://openweathermap.org/api)
3.  Google Maps API access for their GeoLocation. You will need an account and an API key. [Google Maps](https://developers.google.com/maps/documentation/geolocation/get-api-key)

# Getting Started

### Clone the repo into your developemnt space

```
git clone git@github.com:willCode2Surf/chatgpt-plugin-express-vue3-vite-starter.git
```

### Open the project with VS Code/Terminal and install dependencies

```
cd vue3-vite-express-js-boilerplate
npm install
```

### Add .env file to the project

You will need to have a .env file that has 2 variables needed that are used in the application.

```
OPEN_WEATHER_KEY=YOUR_WEATHERKEY
MAPS_KEY=YOUR_MAPS_KEY
```

### Running the application stack

If you want to use the node application as a stand alone without Docker, we are ready. Running npm run start will do a couple things. It builds the SRC and PUBLIC directories into the DIST folder that is used for manifest validation.

```
npm run start
```

If you want to use Docker it is just as easy. There is a known issue with using Husky and Docker. Since Husky and Prettier are geared for developer experience we can remove it for when we need to build the docker image. Just remove this section from the package.json file (inside the scripts portion of package.json).

```
"prepare": "husky install"
```

Once that has been removed from the package.json file we can build the Docker image.

```
docker build -t chatgptweatherplugin:dev .
```

Once it is completed we can run the container image by executing the following docker command (the ENV variables that we have in our .env file will need to be passed to Docker at runtime as well):

```
docker run -d -p 6909:6909 chatgptweatherplugin:dev -e OPEN_WEATHER_KEY=YOUR_WEATHERKEY -e MAPS_KEY=YOUR_MAPS_KEY
```

# Usage

Set up your GPT Plugin in the ChatGPT Plugin UI.
When prompted for Plugin that you created plug in:

```
http://localhost:6909
```

### Ask ChatGPT about the weather!

Now that you have the application running and plugged the endpoint above into the ChatGPT developer plugin spot you ask various questions:

```
Hey, how is the weather in Dallas?
What is the weather in Orlando?
```

# Project Design

This application is intended to be headless as an API. We are using the existing boilerplate to place needed OpenAPI files and ChatGPT manifest.

### Classes

In the folder /classes you will find a couple helpers to complete the requests in a clean, async manner.

### Configuration

In the directory /config you will find the Configuration details that are binded to your environment variables for use throughout the application.

### API Routes

In the directory /express-routes you will find the endpoints that ChatGPT will communicate with and that your OpenAPI file will define.

### Public Resources

There are a couple very specific files in here that are necessary for the ChatGPT Plugin to work properly.

/public/.well-known/ai-plugin.json provides the manifest file for ChatGPT to understand the context it is working within. Referenced files in this manifest are also found here (logo, openapi.yaml)

```
{
  "schema_version": "v1",
  "name_for_human": "WEATHER Plugin (no authorizations)",
  "name_for_model": "location",
  "description_for_human": "Plugin for gathering current weather conditions and forecasts for a given location.",
  "description_for_model": "Plugin for gathering current weather conditions and forecasts for a given location.",
  "auth": {
    "type": "none"
  },
  "api": {
    "type": "openapi",
    "url": "http://localhost:6909/openapi.yaml",
    "is_user_authenticated": false
  },
  "logo_url": "http://localhost:6909/logo.png",
  "contact_email": "support@example.com",
  "legal_info_url": "https://example.com/legal"
}
```

/public/openapi.yaml defines the contraints around the API endpoints that ChatGPT can interact with.

```
openapi: 3.0.1
info:
  title: Weather ChatGPT Plugin
  description: A plugin that allows the user to request current conditions and forecasts.
  version: "v1"
servers:
  - url: http://localhost:6909
paths:
  /routes/weather:
    post:
      operationId: getWeather
      summary: Get weather for a provided location
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/getWeatherRequest"
      responses:
        "200":
          description: OK
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/getWeatherResponse"
  /routes/forecast:
    post:
      operationId: getForecast
      summary: Get forecast for a provided location
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/getForecastRequest"
      responses:
        "200":
          description: OK
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/getForecastResponse"
components:
  schemas:
    getWeatherRequest:
      type: object
      required:
        - 'location'
      properties:
        location:
          type: string
          description: The location's latitude and longitude to gather real time information for.
          required: true
    getForecastRequest:
      type: object
      required:
        - location
      properties:
        location:
          type: string
          description: The location's latitude and longitude to gather forecast information for.
          required: true
    getWeatherResponse:
      type: object
      properties:
        weather:
          type: array
          items:
            type: string
          description: The list of current weather statements.
    getForecastResponse:
      type: object
      properties:
        weather:
          type: array
          items:
            type: string
          description: The list of current forecast statements.
```

# What's Next and Feedback

Let me know if there are any other neat ideas for starter kits around ChatGPT plugins that you would like top see.
