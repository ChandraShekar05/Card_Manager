# Card Manager using SQL

This folder contains the files and resources related to the Node.js assignment submitted by K Chandrashekar. 


## Getting Started

To get started with this project, follow these steps:

1. Install the required dependencies using `npm install`.
2. Create the following table in the cards database
    ```
    use cards;
    
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );

    ```

3. Configure the database connection in `configure/db.js`.
4. Run the application using `node app.js`.
5. To login as admin use the following credentials
    ```
    Username: chandrashekar_Admin
    Password: chandrashekar
    ```
5. Open your browser and navigate to `http://localhost:5050` to access the application.
