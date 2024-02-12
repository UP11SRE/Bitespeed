--- Bitspeed Assignment --- 

-> Introduction

Welcome to the Bitspeed Assignment project! This project is designed to demonstrate how to utilize a web service for identifying users based on their email and phone number.

-> Live Deployment

The project is live and accessible via the following URL: "https://bitespeed-assignment-yil6.onrender.com/" 

-> How to Use

To utilize the project, you can send requests to the designated post route "/identify" with the necessary data in the body. Here's an example using curl:

curl --location 'https://bitespeed-assignment-yil6.onrender.com/identify' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email" : "email1@g.com",
    "phoneNumber" : "987" 
}'

Ensure to replace "email" and "phoneNumber" with the appropriate values.

-> Tech Stack

This project was built using the following technologies:

1- TypeScript
2- Node.js
3- PostgreSQL (Database)
4- Render (Hosting)
5- TypeORM (Database ORM)

-> Note on Response Time

Due to infrastructure constraints, there might be longer response times. Render automatically takes down the site if there's no activity for a while, causing some initial delay when the site is accessed again. However, we've implemented best practices like error handling using try and catch blocks, reusable functions, and minimizing database calls to optimize performance.

-> Future Scope

For future enhancements, we can consider the following:

1- Implementing a load balancer to manage traffic efficiently.
2- Further optimizing database calls for better performance.

Thank you for using the Bitspeed Assignment project! If you have any questions or feedback, feel free to reach out.