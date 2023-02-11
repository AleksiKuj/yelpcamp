# YelpCamp

Responsive web application with similar functionality to yelp but for campgrounds. Users can create new campgrounds and edit & delete existing ones they've added and create reviews for camps.
Inspired by Colt Steele's YelpCamp but with added functionality and different technologies used.
Account credentials for testing is Test:Test
![](https://github.com/AleksiKuj/yelpcamp/blob/master/images/home.png)
![](https://github.com/AleksiKuj/yelpcamp/blob/master/images/list.png)
![](https://github.com/AleksiKuj/yelpcamp/blob/master/images/campground-view.png)

## Tech Stack

- MongoDB
- Express
- React
- Node.js
- React-Bootstrap for UI
- Mapbox for the maps

## Creating and editing an entry

When creating and editing entries, data is validated locally in frontend and in backend with Joi validator.
![](https://github.com/AleksiKuj/yelpcamp/blob/master/images/edit.png)

## Sign in and register

User authentication is done with JsonWebToken and passwords are hashed with bcrypt.

When a user signs in they get a token in the response which gets saved in the browsers localstorage and is used to authorize actions.
![](https://github.com/AleksiKuj/fullstack-todo/blob/master/images/image2.PNG)![](https://github.com/AleksiKuj/fullstack-todo/blob/master/images/image1.PNG)
