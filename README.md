

# R-ainbow - Birthday Discount Service

This is a service that is responsible for generating and sending personalized discount codes to customers on their birthday. The service is typically part of a larger marketing campaign aimed at promoting customer loyalty and increasing sales. This service may also be responsible for suggesting personalized products to customers based on their interests and purchase history. The service may use a variety of data sources and algorithms to determine the appropriate discount amount and product suggestions for each customer.
 
## Modules

**1) Authentication Module:** This module handles authentication and authorization of users. It includes a secure login system using JWT tokens to ensure that only authenticated users can access the system.

**2) Customer Module:** This module handles all customer-related operations such as registration and updating customer information.

**3) Product Module:** This module handles all product-related operations such as adding products, deleting products, and updating products.

**4) Discount Module:** This module handles all discount-related operations such as generating discount codes, applying discounts to orders, and retrieving discount information.

**5) Email Service:** This service is built using nodemailer (which is an email service used in development). For production deployment, a more robust cloud email service like SendGrid or Amazon SES should be used. It will be responsible for sending out personalized emails to customers with their discount codes and suggested products.

**6) Scheduling Service:** A cron job was implemented to run periodically (e.g. every day at 6AM) to check if any customers have their birthday in the upcoming week. If there are, a personalized email will be generated for each of them, with a unique discount code and a list of personalized suggested products.

**7) Database Module:** This module handles all interactions with the database, including data storage and retrieval.



## Pre-requisites

- Make sure NodeJS, NestJS, NPM & PostgreSQL are installed and their PATHs defined. You can download NodeJS from [here](https://nodejs.org/en/) and PostgreSQL from [here](https://www.postgresql.org/docs/14/index.html).
## Run Locally

Clone the project

```bash
  git clone https://github.com/toubhie/birthday-discount-service.git
```

Go to the project directory

```bash
  cd birthday-discount-service
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:dev
```


## API Documentation

You can access the Swagger API documentation by typing [http://localhost:3000/api](http://localhost:3000/api) in the browser after starting the application.


## Contributing

Contributions are always welcome! Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

To fork this Project
- Create your Feature Branch (git checkout -b feature/NewFeature)
- Commit your Changes (git commit -m 'Added some new feature')
- Push to the Branch (git push origin feature/NewFeature)
- Open a Pull Request

## Technologies Used
- NestJS
- TypeScript
- TypeORM
- PostgreSQL

## Authors

- [Williams Tobiloba](https://github.com/toubhie)

