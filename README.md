# GitGud

A validator of your GitHub profile and Git use, designed to provide feedback for job seekers and graduated students.

## How

First it checks your public profile - A good GitHub profile can impress an interviewer.

Secondly it validates your pinned repositories on how you use Git - Proper use of version control with Git can show that you are a structured worker and is able to work in development teams. We chose to focus on your pinned repos because you can present certain project as you portfolio for potential employers

## Why

You can use GitHub as your resume for job hunting. For developers it is important to code regularly, be able to work in teams, communicate properly and continue with a learning curve. Obviously this is something you can say you are the best in and write it on your resume, but with GitHub you are able to show that you can do this. Which will give you headsup on your next interview.

Unfortunately many recent graduates or job seekers lack a proper GitHub profile. And as Codaisseur teachers can acknowledge, the feedback they get is repetitive. Therefore we developed this tool and provide constructive feedback which is based on various resources accross the internet and uses live data from the GitHub API.

## Who

As three graduates of the Codaisseur Academy in Amsterdam we developed this tool from scratch with Rein op ‘t Land - a teacher and developer at Codaisseur - who acted as our Product Owner

## Authors

* **Oleksandra Akulshyna** - *Initial work* - [w3bgir1](https://github.com/w3bgir1)
* **Vincent de Graaf** - *Initial work* - [vdegraaf](https://github.com/vdegraaf)
* **Natalia Volchatova** - *Initial work* - [Klackky](https://github.com/Klackky)

## Tools

Frontend - JavaScript, ApolloClient
Backend - TypeScript, GraphQL, Apollo/KoaServer
GitHub API v4 - GraphQL

## Development

Clone repository
setup local postgresql database
cd into client  
  $ npm install 
  $ npm run start
install open cv 
  $ brew install pkg-config opencv@2
  $ brew link opencv@2 --force
cd into server 
  $ npm install 
  $ GITHUB_ACCESS_TOKEN= yourtokenhere \ npm run dev

## Deployment

NodeJS buildpack

$ heroku buildpacks:add heroku/nodejs

OpenCV builbpack

$ heroku buildpacks:add --index 1 https://github.com/automata/heroku-buildpack-opencv.git

Downgrade to Cedar 14 since on Cedar 16 it won’t work without extra configurations

$ heroku stack:set cedar-14

Push to Heroku

$ git push heroku

After deploying your app may scale down to 0 dynos
... so increase dynos amount to the desired number

$ heroku ps:scale web=1

## Acknowledgments

Special thanks to Rein op 't Land, our teacher and Product Owner. 
* **Rein op 't Land** - [ReinoptLand](https://github.com/Reinoptland)
