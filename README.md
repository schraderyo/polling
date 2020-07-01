# Polling Application

A dual-facing web app that enables an Admin to create and send a multi-question poll to a group of Users. Each user receiving the poll should then be able to connect and respond to the questions. 

## Requirements

- The app should allow an admin to login and create their own set of users and polls 
○ The admin should be able to login using an email address and password 
■ email: admin@example.com 
■ password: password 

- The admin should be able to add one or more users that will receive a poll. 
○ First name 
○ Last name 
○ Email address 

- The admin should be able to create a poll with one or more questions
○ Each question will have a boolean Yes / No response 

- The admin should be able to click a button to send the poll to one or more users 
○ The app should generate a unique url representing the user and and the poll which is to be sent to the user (by text, email, etc.) 
○ The same poll can be sent multiple times (e.g. daily) so each run of a poll needs to be tracked separately 

- When the user clicks on the received link, they will be directed to a mobile-optimized page where they will be asked the questions to answer 
○ Each response should be recorded in order to capture partial answers to multi-question polls 
○ After the final response is given, a final “Submit” button pops-up a “Thank you” message and closes the window/tab 
○ If the user clicked the link and viewed the poll, the poll status should be set to ‘viewed’ 
○ If the user answers at least one question, the poll status should be set to ‘in-progress’ 
○ A final submission marks the poll as ‘completed' 
- The admin should have a dashboard view to see the polls they created and for each poll, all the runs of that poll. 

○ Global stats: 
■ Total number of polls 
■ Total number of users 
○ For each poll run, the admin should be able to see some summary stats 
■ Total number of responses 
■ Percent breakdown of each question 
○ The admin should be able to drill down and see all the responses for a poll 

○ The admin should be able to drill down on a single user and see all the polls they’ve responded to and for each poll all the responses they’ve given for that poll sorted by timestamp. 
Design & Development 
● Framework: Angular 
● No UI constraints — you can use a toolkit (e.g material, ng-zorro, bootstrap, etc.) or roll your own 
● Up to you to develop an information architecture that creates the best UX experience for both the admin and the user. 
● Up to you to to create the data model, storage and exchange to be used between the various admin and user views 


## Development Environment 

* [Express](https://expressjs.com/)
* [Angular CLI](https://cli.angular.io/)
* [json-server](https://github.com/typicode/json-server)
  * A full fake REST API

## Running the Application

Review the available scripts in the [package.json](package.json)   

## Run in Production Mode

Application will run on [localhost:8000](http://localhost:8000)

Enter any username and password to login

`npm start`

## Run in Development Mode

Application will run on [localhost:4200](http://localhost:4200)

To Login as Admin 
Email: admin@example.com
Password: password

`npm run start-dev`

_Please Note:  To have Angular call `json-server` directly, set `DEBUG` to `true` in [app.service.ts](./src/app/app.service.ts)_
