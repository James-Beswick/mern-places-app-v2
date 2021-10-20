# mern-places-app-v1

Date: 20/10/2021

This app is currently deployed at https://mern-places-109e3.web.app/

With it being the first version, there are plenty of fixes that need to be made already, such as a minor styling bug causing users to have a white border around them.

The frontend is deployed to firebase hosting services and the backend is hosted on heroku. NB. Due to the backend being stored on the free tier of heroku the server will periodically sleep and thus, not save image files sent across. I plan on fixing this by using a AWS S3 server to host the image files and call them to the backend from there.

Main Technologies: 
(Front-End)
1. Javascript
2. React
3. CSS/SCSS

(Back-End)
1. Javascript
2. Node.js
3. Express
4. MongoDB Atlas
5. Mongoose

Minor Technologies:
(Front-End)
1. React-Transition-Group
2. React Router
3. React Context

(Back-End)
1. body-parser
2. Postman
3. nodemon
4. Express-Validator
5. Google Geocoding API
6. mongoose-unique-validator
7. Axios
8. bcryptjs
