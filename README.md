# cheeper-api
Cheeper's Backend

## Steps for run Backend

#### Check .env.example
  Open the env.example. That is in the root project.
  * Check the env.example and create new File with the name ".env".
  * Paste the same content of env.example in ".env".
  * write all values this required of your fireBase credentials in the ".env" file.

#### Install Node dependencies
  In the root project use the follow command to install Node dependencies
  * npm install

#### Run Project
You have a lot of options to run the Backend, but this options depends that you want to do.

##### For Developer mode
If you want to all changes over code refreshed, use: 'npm run dev'
this option use nodemon to run project.

##### For Developer Debug or Inspect mode
If you want ton inspect all that you dev, you can use the follow commands depending you need.
'npm run debug' or  'npm run inspect'.

##### For Production mode
This option is very simple. you should to use if you want to run project in production.
this option doesn't have debug options and the consoles.log nothing showing.
Command: 'npm run start' or 'npm start'.

#### Test, cover and report Project
##### For run tests project
This options run test about routes and services of project with Mocha.js
Command: 'npm run test'

##### For run cover project
If you want to see how much do you cover you test and other things about project, use:
Command: 'npm run cover'.
This options run tests project with nyc.

##### For make reports of project
If you want to make reports of the result about cover and tests of the project use:
Command: 'npm run report',
This option create a HTML file with the table of results about cover and tests.


### If you want to use my Postman Routes.
  Go to my Postman Team, join up and Click over this url:
  https://app.getpostman.com/join-team?invite_code=6cfa2ad91b05b96ce2309754ee88f474

#### ¡Important about Postman Routes!
  I`m using environment to replace 'https://localhost:3000' for {{url}}
  if you don't use this config, you have two options:
    * Create a environment with url like variable.
    * Replace {{url}} for 'https://localhost:3000' in every Postman route.



Happy hack!!
