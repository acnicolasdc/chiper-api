# chiper-api
![Chiper logo](https://www.kaszek.com/wp-content/uploads/2019/08/chiper-logo.png)

By **Nicolas Reyes Bejarano**
>Find me in other platforms like **@acnicolasdc**.

_Santiago de Cali, Valle del cauca_.

## Steps for run Backend

### Check .env.example
  Open the env.example. That is in the root project.
  Check the env.example and create new File with the name **.env**.
  
  * Paste the same content of env.example in **.env**.
  * write all values this required of your fireBase credentials in the **.env** file.

### Install Node dependencies
  In the root project use the follow command to install Node dependencies
  > **npm install**

### Run Project
You have a lot of options to run the Backend, but this options depends that you want to do.

#### For Developer mode
If you want to all changes over code refreshed, use: 
> **npm run dev**

this option use nodemon to run project.

#### For Developer Debug or Inspect mode
If you want ton inspect all that you dev, you can use the follow commands depending you need.

> **npm run debug**
> 
> **npm run inspect**.

#### For Production mode
This option is very simple. you should to use if you want to run project in production.
this option doesn't have debug options and the consoles.log nothing showing.

> **npm run start**
> 
> **npm start**


### Test, cover and report Project
#### For run tests project
This options run test about routes and services of project with Mocha.js

>**npm run test**

#### For run cover project
If you want to see how much do you cover your test and other things about project, use:

> **npm run cover**

This options run tests project with **nyc**.

#### For make reports of project
If you want to make reports of the result about cover and tests of the project use:

>**npm run report**

This option create a _HTML_ file with the table of results about cover and tests.

## Deploy Backend with Zeit Now
In this section you can do the deployment project with **Zeit Now**.

**Zeit Now** is a cloud application for hosting static applications. This technology works with serverless.
### Steps for Deploy
#### Install and Login Zeit Now in your terminal
You can get Now CLI from either npm. Run the following command from your terminal:
> **npm i -g now**

With Now CLI installed, you can now login using:
> **now login**

#### Create a Secret
To make sensitive information available to your project once deployed, We are using **Now Secrets** for **.env** variables, the data will be encrypted and stored securely, no longer directly accessible by anyone.

List of the secrets to create:

| NOW SECRET  |  .ENV FILE |
|---|---|
|api-chiper-type|  TYPE |
|api-chiper-project-id|  PROJECT_ID |
|api-chiper-private-key-id|  PRIVATE_KEY_ID |
|api-chiper-private-key| PRIVATE_KEY  |
|api-chiper-client-email| CLIENT_EMAIL  |
|api-chiper-client-id| CLIENT_ID  |
|api-chiper-auth-uri| AUTH_URI  |
|api-chiper-token-uri| TOKEN_URI  |
|api-chiper-auth-provider| AUTH_PROVIDER  |
|api-chiper-client-cert| CLIENT_CERT  |
|api-chiper-db-url| DB_URL  |

For create a **Secret** use:
> **now secrets add _secret-name_  _secret-value_**

In the **_secret-value_** you should to put the **.env** value of the variable, not the name of the variable. 

For create the secret of **PRIVATE_KEY** you should to use a diferent command, because this value has a especial chars.

> **now secrets add _secret-name_ -- "_secret-value_"**

#### Create a Now.json file
In the root project you should to create a now.json file and put the follow variables and values.

~~~ javascript
{
 "name": "project_name",
 "version": 2,
 "builds": [{ "src": "index.js", "use": "@now/node"}],
 "routes": [{ "src": "/(.*)", "dest": "/index.js"}],
 "env": {
     "TYPE": "@api-chiper-type",
     "PROJECT_ID": "@api-chiper-project-id",
     "PRIVATE_KEY_ID": "@api-chiper-private-key-id",
     "PRIVATE_KEY": "@api-chiper-private-key",
     "CLIENT_EMAIL": "@api-chiper-client-email",
     "CLIENT_ID": "@api-chiper-client-id",
     "AUTH_URI": "@api-chiper-auth-uri",
     "TOKEN_URI": "@api-chiper-token-uri",
     "AUTH_PROVIDER": "@api-chiper-auth-provider",
     "CLIENT_CERT": "@api-chiper-client-cert",
     "DB_URL": "@api-chiper-db-url"
    }
}
~~~
#### Deploy project 🚨🚨
In the root project run:
> now

### If you want to use my Postman Routes.
  Go to my Postman Team, join up and Click over this url:
  
  <https://app.getpostman.com/join-team?invite_code=6cfa2ad91b05b96ce2309754ee88f474>

#### ¡Important about Postman Routes!
  I'm using environment to replace <https://localhost:3000> for **{{url}}**
  
if you don't use this config, you have two options:
  
   * Create a environment with **url** like variable.
   * Replace **{{url}}** for <https://localhost:3000> in every Postman route.


Happy hack!!
