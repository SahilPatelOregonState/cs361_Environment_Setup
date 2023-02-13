# cs361_Environment_Setup

# microservice for teammate, generate a csv from array object
- the microservice will communicate via express servers 
 the main project(hosted on PORT 3000) for my partner will send a post requestand await(asynchronously) sending the javascript array object 

to the microservice server to the express server on
 PORT 3001 and then the microservice will turn that object to a csv formatted string and will then respond and send back the csv_string 
 back to the main server/main project to write to a csv_file