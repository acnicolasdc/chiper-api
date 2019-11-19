# chiper-api
![Chiper logo](https://www.kaszek.com/wp-content/uploads/2019/08/chiper-logo.png)

By **Nicolas Reyes Bejarano**
>Find me in other platforms like **@acnicolasdc**.

_Santiago de Cali, Valle del cauca_.

## Steps for run Backend

### Check .env.example
Open the env.example. The one you find in the root project. Check the env.example and create a new file **.env**.
  
  * Paste the same content of env.example in the new file **.env**.
  * Fill out all your fireBase credentials values required in the **.env** file.

### Install Node dependencies
In the root project, use the following command for installing Node dependencies

> **npm install**

### Run Project
You have plenty of options to run the Backend, but these options depend on what you want to do.

#### For Developer mode
If you want to see all the changes over code in real-time, use: 
> **npm run dev**

this option use nodemon to run the project.

#### For Developer Debug or Inspect mode
If you want to inspect all that you dev, you can use the following commands depending on your
need.

> **npm run debug**
> 
> **npm run inspect**.

#### For Production mode
This option is very simple. you should use it if you want to run a project in production. This mode
doesn't have debug options and the consoles.log doesn't show anything.

> **npm run start**
> 
> **npm start**


### Test, cover and report Project
#### For run tests project
This option runs several tests over the project's routes and services using Mocha.js

>**npm run test**

#### For run cover project
If you want to see how much of your tests and other things about the project you are covering, use:

> **npm run cover**

This option runs the tests project with **nyc**.

#### Creating project reports
If you want to create reports regarding cover and tests project, use:

>**npm run report**

This option creates an _HTML_ file with cover and test table results.

## Deploy Backend with Zeit Now
In this section, you can deploy the project with **Zeit Now**.

**Zeit Now** is a cloud application for hosting static applications. This technology works serverless.
### Steps for Deploy
#### Install and Login Zeit Now in your terminal
You can get Now CLI from npm. Run the following command from your terminal:
> **npm i -g now**

With Now CLI installed, you can log in **Now** using:
> **now login**

#### Create a Secret
To make sensitive information available to your project once deployed, We are using _Now Secrets_
for **.env** variables, the data will be encrypted and stored securely, no longer directly accessible by
anyone.

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

In the **_secret-value_**, you should put the **.env** variable value, not the name of the variable.

For creating the secret of **PRIVATE_KEY** you should use a different command because this value
has special chars.

> **now secrets add _secret-name_ -- "_secret-value_"**

#### Create a now.json file
In the root project you should create a **now.json** file and put the following variables and values.

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
Go to my Postman Team, join up and click over this url:
  
  <https://app.getpostman.com/join-team?invite_code=6cfa2ad91b05b96ce2309754ee88f474>

#### ¡Important about Postman Routes!
I'm using the environment to replace <https://localhost:3000> for **{{url}}**
  
If you aren't using this config, you have two options:
  
   * Create an environment with **url** as a variable.
   * Replace **{{url}}** for <https://localhost:3000> in every Postman route.


#### Happy Hack 🤘💻!!
