
     ,-----.,--.                  ,--. ,---.   ,--.,------.  ,------.
    '  .--./|  | ,---. ,--.,--. ,-|  || o   \  |  ||  .-.  \ |  .---'
    |  |    |  || .-. ||  ||  |' .-. |`..'  |  |  ||  |  \  :|  `--, 
    '  '--'\|  |' '-' ''  ''  '\ `-' | .'  /   |  ||  '--'  /|  `---.
     `-----'`--' `---'  `----'  `---'  `--'    `--'`-------' `------'
    ----------------------------------------------------------------- 


Threatened Species
Interactive Data visualisation Web Application

This Web App was built as the second project for the Code Institute's classroom bootcamp. It is a Data Visualisation project using Pythons Flask framework.

Live Demo
Follow this link to view deployed version of the web app https://stream2project.herokuapp.com/

Built with
Flask
Python
HTML
CSS
Bootstrap
MongoDB database
JavaScript Libraries:
d3.js
dc.js
crossfilter.js
queue.js
A dataset obtained here
Components
Flask
A Python micro-framework that was used to serve the data and render the HTML pages for this Application

Python
A Python file name dashboard.py renders a graphs.html template and builds a web server using pymongo to interact with MongoDB

MongoDB database
NoSQL database that converts and presents data in JSON format. The dataset resource was downloaded as a csv file from here.

Queue.js
An asynchronour helper library for JavaScript

Crossfilter.js
A Javascript based data manipulation library that enables two way data binding - you will see this in action when a section of a graph is clicked, all the other graphs filter

D3.js
A JavaScript based visualisation engine that renders interactive charts and graphs in svg format when given data, which are then passed in to divs in graphs.html

Dc.js
A Javascript based wrapper library for d3.js - this made plotting the charts easier

Topojson.mim.js
An extension to GeoJSON that encodes topology. 

Deployment / Hosting
This Application was deployed and is hosted on Heroku - gunicorn Python package runs the http server for the app, the Procfile gives Heroku the information to run the app and requirements.txt is a file that conains all the Python packages (pip installs) required to run the app.

Testing
This Application was tested across a range of browsers