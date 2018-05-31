# Todoer
## by David Yu (21711933)
## and Thai Nguyen (21986407)

## Running tests
`npm run mocha`

## Running web app
cd into server directory and run `npm start`

## Setting up the dev environment
1. Make sure you have mongo installed and running
2. cd into client directory and run `npm install` and then `npm start`
3. cd into the server directory and run `npm install` and then `npm start` or `nodemon` for hot reloading

## Visit the cloud server
I recommend visiting the cloud server to see all the features
[website](http://coders.lol)

## How to deploy to the cloud
Refer to this guide for comprehensive overview https://devcenter.heroku.com/articles/git
1. Install git
2. Install heroku cli
3. Login to heroku cli
4. cd into the app you want to deploy
5. create heroku app with `heroku create appname`
6. Add a procfile in root
7. Provision a mongodb database with mlab add on
8. git commit all your changes
9. Deploy to heroku `git push heroku master`
10. Hopefully everything worked if some errors occured check the logs `heroku logs`
