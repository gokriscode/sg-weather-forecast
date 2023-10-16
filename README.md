The "Sample Weather Forecast Application and Display Camera Images" is a React.js web application that combines weather forecast information with real-time camera images from the SG (Singapore) public transport open API. This application allows users to access up-to-date weather forecasts and view live camera feeds from public transport locations in Singapore, offering a convenient way to check the weather and traffic conditions in the city.

1. Setup and run the Server application with port 4000
2. Setup and run the Frontend Web Application with port 3000

### 1. Setup Server Application

**Instructions to Start the NestJS Serice in the Development Environment:**

In this application, we will be creating a RESTful API using NestJS that will run on port 4000. RESTful APIs are a standard for building web services that are easy to consume and understand.

Follow these steps to set up and start your NestJS application in a development environment, specifically running on port 4000:

**Prerequisites:**

**Instructions to Start the NestJS App from a Git Repository and Subfolder:**

1. Ensure you have Node.js and npm (Node Package Manager) installed on your system. You can download them from [nodejs.org](https://nodejs.org/).

**Step 1: Clone the Git Repository**

Open your terminal and navigate to the directory where you want to clone the Git repository. Then, run the following command to clone the repository:

```bash
git clone https://github.com/gokriscode/sg-weather-forecast.git
```

**Step 2: Navigate to the Subfolder**

Navigate into the `weather-forecast-nestjs-service` subfolder of the cloned repository:

```bash
cd sg-weather-forecast/weather-forecast-nestjs-service
```

**Step 3: Install Dependencies**

Use npm to install the project dependencies:

```bash
npm install
```

**Step 4: Start the Development Server**

To start your NestJS application in the development environment, use the following command:

```bash
npm run start:dev
```

This command will start your NestJS server, and by default, it will listen on port 3000. To run it on port 4000 as specified, you can set the `PORT` environment variable, just like in the previous instructions:

On Unix-based systems:

```bash
PORT=4000 npm run start:dev
```

On Windows:

```bash
set PORT=4000 && npm run start:dev
```

**Step 5: Access Your API**

Your NestJS application from the Git repository's subfolder is now running in the development environment on port 4000. You can access your RESTful API by opening a web browser or using a tool like [curl](https://curl.se/) or [Postman](https://www.postman.com/), and making HTTP requests to `http://localhost:4000`.

You're now ready to develop and test the NestJS service from the specified subfolder of the Git repository. 

### 2. Setup Web Application

Instructions to Start the Web App in a Development Environment:

To start the "Sample Weather Forecast Application and Display Camera Images" in a development environment, follow these steps:

Prerequisites:
1. Ensure that you have Node.js and npm (Node Package Manager) installed on your system. You can download them from the official website: https://nodejs.org/.

Steps:

1. Clone the Repository:
   - Open your command line or terminal.
   - Navigate to the directory where you want to store the project.
   - Run the following command to clone the repository:

   ```
   git clone https://github.com/gokriscode/sg-weather-forecast.git
   ```


2. Navigate to the Project Directory:
   - Change your current directory to the project folder by running:

   ```
   cd sg-weather-forecast/weather-forecast-app
   ```

3. Install Dependencies:
   - Install the project's dependencies by running the following command:

   ```
   npm install
   ```

4. Configure Environment Variables:
   - The application might require API keys or URLs for the weather forecast and camera image services. Check the project documentation for any necessary environment variables and set them accordingly.

5. Start the Development Server:
   - To launch the development server and run the application, use the following command:

   ```
   npm start
   ```

   This command will start the development server and automatically open the application in your default web browser.

6. Access the Application:
   - The application should now be running in your web browser at `http://localhost:3000`. You can interact with it and explore its features.

7. Development and Testing:
   - Make any necessary code changes and enhancements to the application.
   - Test the application thoroughly in the development environment.

That's it! You should now have the "Sample Weather Forecast Application and Display Camera Images" up and running in your development environment. You can continue to develop, customize, and test the application as needed.