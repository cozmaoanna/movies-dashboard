
     ,-----.,--.                  ,--. ,---.   ,--.,------.  ,------.
    '  .--./|  | ,---. ,--.,--. ,-|  || o   \  |  ||  .-.  \ |  .---'
    |  |    |  || .-. ||  ||  |' .-. |`..'  |  |  ||  |  \  :|  `--, 
    '  '--'\|  |' '-' ''  ''  '\ `-' | .'  /   |  ||  '--'  /|  `---.
     `-----'`--' `---'  `----'  `---'  `--'    `--'`-------' `------'
    ----------------------------------------------------------------- 


<h1> Movies
Interactive Data visualisation </h1>

<h3> This Web App was built as the second project for the Code Institute's classroom bootcamp. It is a Data Visualisation project using Pythons Flask framework. </h3>

<h3> Live Demo </h3>
Follow this link to view deployed version of the web app https://stream2project.herokuapp.com/

<h3> Built with </h3>
<strong> Flask
Python,
HTML,
CSS,
Bootstrap,
MongoDB database,
</br> JavaScript Libraries:
d3.js,
dc.js,
crossfilter.js,
queue.js,
A dataset obtained here,
Components,
Flask,
</br> A Python micro-framework that was used to serve the data and render the HTML pages for this Application </strong>

<h3> Python </h3>
A Python file name dashboard.py renders a graphs.html template and builds a web server using pymongo to interact with MongoDB

<h3> MongoDB database </h3>
NoSQL database that converts and presents data in JSON format. The dataset resource was downloaded as a csv file from here.

<h3> Queue.js </h3>
An asynchronour helper library for JavaScript

<h3> Crossfilter.js </h3>
A Javascript based data manipulation library that enables two way data binding - you will see this in action when a section of a graph is clicked, all the other graphs filter

<h3> D3.js </h3>
A JavaScript based visualisation engine that renders interactive charts and graphs in svg format when given data, which are then passed in to divs in graphs.html

<h3> Dc.js </h3>
A Javascript based wrapper library for d3.js - this made plotting the charts easier

<h3> Topojson.mim.js </h3>
An extension to GeoJSON that encodes topology. 

<h3> Deployment / Hosting </h3>
This Application was deployed and is hosted on Heroku - gunicorn Python package runs the http server for the app, the Procfile gives Heroku the information to run the app and requirements.txt is a file that conains all the Python packages (pip installs) required to run the app.

<h3> Testing </h3>
This Application was tested across a range of browsers