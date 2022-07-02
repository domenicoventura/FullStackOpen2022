# FullStackOpen2022

This course serves as an introduction to modern web application development with JavaScript. The main focus is on building single page applications with ReactJS that use REST APIs built with Node.js. The course also contains a section on GraphQL, a modern alternative to REST APIs.
The course covers testing, configuration and environment management, and the use of MongoDB for storing the application’s data.

Part 0

In this part, we will familiarize ourselves with the practicalities of taking the course. After that we will have an overview of the basics of web development, and also talk about the advances in web application development during the last few decades.

Part 1

In this part, we will familiarize ourselves with the React-library, which we will be using to write the code that runs in the browser. We will also look at some features of JavaScript that are important for understanding React.

Part 2

Let's continue our introduction to React. First, we will take a look at how to render a data collection, like a list of names, to the screen. After this, we will inspect how a user can submit data to a React application using HTML forms. Next, our focus shifts towards looking at how JavaScript code in the browser can fetch and handle data stored in a remote backend server. Lastly, we will take a quick look at a few simple ways of adding CSS styles to our React applications.

Part 3

In this part our focus shifts towards the backend, that is, towards implementing functionality on the server side of the stack. We will implement a simple REST API in Node.js by using the Express library, and the application's data will be stored in a MongoDB database. At the end of this part, we will deploy our application to the internet.

Part 4

In this part, we will continue our work on the backend. Our first major theme will be writing unit and integration tests for the backend. After we have covered testing, we will take a look at implementing user authentication and authorization.

Part 5

In this part we return to the frontend, first looking at different possibilities for testing the React code. We will also implement token based authentication which will enable users to log in to our application.

Part 6

So far, we have placed the application's state and state logic directly inside React components. When applications grow larger, state management should be moved outside React components. In this part, we will introduce the Redux library, which is currently the most popular solution for managing the state of React applications.

Part 7

The seventh part of the course touches on several different themes. First, we'll get familiar with React router. React router helps us divide the application into different views that are shown based on the URL in the browser's address bar. After this, we'll look at a few more ways to add CSS styles to React applications. During the entire course, we've used create-react-app to generate the body of our applications. This time, we'll take a look under the hood: we'll learn how Webpack works and how we can use it to configure the application ourselves. We shall also have a look at hook functions and how to define a custom hook.

Part 8

This part of the course is about GraphQL, Facebook's alternative to REST for communication between browser and server.

Part 9

This part is all about TypeScript: an open-source typed superset of JavaScript developed by Microsoft that compiles to plain JavaScript.
In this part, we will be using the tools previously introduced to build end-to-end features to an existing ecosystem with linters predefined and an existing codebase writing TypeScript. After doing this part, you should be able to understand, develop and configure projects using TypeScript.

Part 10

In this part, we will learn how to build native Android and iOS mobile applications with JavaScript and React using the React Native framework. We will dive into the React Native ecosystem by developing an entire mobile application from scratch. Along the way, we will learn concepts such as how to render native user interface components with React Native, how to create beautiful user interfaces, how to communicate with a server, and how to test a React Native application.

Part 11

So you have a fresh feature ready to be shipped. What happens next? Do you upload files to a server manually? How do you manage the version of your product running in the wild? How do you make sure it works, and roll back to a safe version if it doesn’t?
Doing all the above manually is a pain and doesn’t scale well for a larger team. That’s why we have Continuous Integration / Continuous Delivery systems, in short CI/CD systems. In this part, you will gain an understanding of why you should use a CI/CD system, what can one do for you, and how to get started with GitHub Actions which is available to all GitHub users by default.

Part 12

In this part, we will learn how to package code into standard units of software called containers. These containers can help us develop software faster and easier than before. Along the way, we will also explore a completely new viewpoint for web development outside of the now-familiar Node.js backend and React frontend.
We will utilize containers to create immutable execution environments for our Node.js and React projects. Containers also make it easy to include multiple services with our projects. With the flexibility, we will explore and experiment with many different and popular tools by utilizing containers.

Part 13

In the previous sections of the course we used MongoDB for storing data, which is a so called NoSQL database. NoSQL databases became very common just over 10 years ago, when the scaling of the internet started to produce problems for relational databases that utilized the older generation SQL query language.
Relational databases have since then experienced a new beginning. Problems with scalability have been partially resolved and they have also adopted some of the features of NoSQL databases. In this section we explore different NodeJS applications that use relational databases, we will focus on using the database PostgreSQL which is the number one in the open source world.