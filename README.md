# :house: **Image Processing**

## :cyclone: **Project Setup**

Getting started with contributing on this project is very simple, we have done this so that you can focus on building the product and not get distracted with setting up the project.
The first thing you need to do is to clone the repository into your local machine.

```bash
  # Clone the application to your local machine
  foo@bar:~$ git clone https://github.com/adisen/Image-Processing-API.git
```

### :snail: Local Setup

To set this up on your machine, make sure that you have [NodeJS](https://nodejs.org) and [npm](https://npmjs.com) installed on your local machine. After establishing that you have NodeJS installed, navigate into the cloned project directory and follow the steps below:

```bash
  # Navigate into the client directory
  foo@bar:~$ cd Image-Processing-API

  # Install the packages
  foo@bar:~$ npm install

  # Run the application in development
  foo@bar:~$ npm run dev
```

### :snail: Available Endpoints

1. Working Endpoint (To test the health of server)
   GET /

2. Resize Image:
   GET /api/image?filename=fjord&width=100&height=100"
