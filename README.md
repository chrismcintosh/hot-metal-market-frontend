# Hot Metal Market (Front End) - Next JS 
## Introduction
This repository is an ecommerce implementation of the https://github.com/laravel/breeze-next starter kit.

The project is built using React and TypeScript and interfaces with an API Backend https://github.com/chrismcintosh/hot-metal-market-backend.

## What To Know
In order to get this application working you'll need to have a working Laravel Breeze installation - here is an example https://github.com/chrismcintosh/hot-metal-market-backend.

Once you have the backend project installed you can use the `php artisan serve` command from the backend directory to serve the backend on localhost:8000 which should avoid any CORS issues.

## Getting Started
To get the front end started
1. Clone this repo down
2. Copy the `.env.example` file to `.env.local`
3. In the new env file ensure the backend location and port is correct and fill in your own stripe keys.
4. Run `npm install` from the cloned directory
5. Run `npm run dev` to begin developing or browsing the project