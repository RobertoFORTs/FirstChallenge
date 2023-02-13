# FirstChallenge

## Table of Contents
* General Info
* Technologies
* Setup
* Features

## General Info
A planner to organize the week of someone built. This is a training project to learn node.js and express

## Technologies
Project is created with:

* node.js@18.13.0 
* express@4.18.2
* nodemon@2.0.20

## Setup
Please see the appropriate guide for the enviroment of choice.

To run this project, install locally usign npm:

```npm i nodemon```

```npm i express```

Besides that, you can also install and use Postman to send requests:

The routes used are:
```/api/v1/events/```
 * For getAllEvents(get request)
 * For createEvent(post request)
 
```/api/v1/events?dayOfTheWeek=xyz```
 * For  getEventsOnWeekDay(get request)
 * For deleteEventsFromWeekDay(delete request)
  
```/api/v1/events/:id```
 *  For getEventById(get request) 
 *  For deleteEventById(delete request)

```/api/v1/users/signUp```
 * For signUserUp(post request)
  
```/api/v1/users/signIn```
 * For userSignIn(post request)
 

## Features
* Get all events
* Get events of week day(gets the events of the closest week day)
* Get events by id
* Create an event following the requirements({description:"" , dateTime: "asDate", createdAt: "asDate"})
* Delete event by its id
* Delete all events of a week day
* Resgistrate an user following the requirements({"firstName":"string","lastName":"string","birthDate":"asDate","city":"String","country":"String","email":"String","password":"String","confirmPassword":"String"})
* Sign a user in

