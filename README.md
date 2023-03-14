Note : 
This is only a 40% completed project of a university course, it's main purpose was to provide time estimation of bus arriving in the busstops around the university to the users(students) of the bus service. These bus services are monitored and provided by the university itself.

However, this project was not successfully achieved as it would require 
1) Installation of tracking devices in the buses
2) Lack of expense to test realtime by hosting
3) Time constraints 

The frontend are done with vanilla Javascript and backend are done using Express (node.js framework)

The logic for authentication are handled using firebase auth, the highlighted route that maps "from" to "to" are handled by google map API

The time estimation that was shown is not the correct representation, it is typed in html. (Supposed can be estimated using google map API, but due to dateline submission and negotiation from lecturer, this was submitted as final)

Backend with Express was done minimally in "app.js" (only routing was sort of complete, the authentication using firebase is not completely setup, user can simply redirect to the homepage without login)

Further references, were commented in app.js , such as :
1. Perhaps managing backend with the help of Web Sockets to achieve realtime updates from the tracking devices
2. processing and managing the data from the tracking device (if it was successfully installed in the bus)
3. Connection pooling, terminating and creating connection with database server
4. Retrieving bus stop location from database server rather than from js files (requires the use webpack , or front-end frameworks that could solve complications faced due to using vanilla javascript)
5. And many more i believe to optimize it to be able to serve its purpose

---------------To Launch Putraride Prototype-------------
1. Fork this repo and clone it to your machine
2. Need to install and configure all dependencies, by referencing package.json (just run "npm install")
3. To run it, use "node app.js", makesure you are in the directory of this app.js file
4. Remember to replace "YOURAPIKEY" in the html pages with your API key you obtained from your GCP