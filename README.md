# Node.js gRPC Learning Project

This project Serve as a sample project for interacting with **gRPC** in Node.js.
There are 3 sub directories in this repository. Every one of these directories,
has its own project and structure to work and interact with gRPC system.

## Sub directories

- **syntax and rules**:

  This directory contains two examples for `.proto` files, which were used to
  increase the level of understanding and familiarity with the syntax and
  rules of writing **Protocol Buffer** files.

- **project 01**:

  This directory contains a sample project developed to increase the level of
  understanding and familiarity with gRPC request and response methods such as
  `Unary`, `Server Stream`, `Client Stream` and `Bidi Stream`.

- **project 02**:

  This directory contains a simple product management project which is developed
  in order to increase the level of understanding of how to create a connection
  between a **gRPC service** and a **node.js** application and how to send and
  receive requests between two system.

## Prerequisites

Before you begin, ensure you have the following software installed on your system:

- [Node.js](https://nodejs.org/) (latest version)
- [MongoDB](https://www.mongodb.com/) (latest version)
- [Visual Studio Code](https://code.visualstudio.com/) (or any code editor of your choice)

## Installation and setup

Before running this project, you should know that only the `project 01` and `project 02` can
be run and the `.proto` files inside the `syntax and rules` directory are not runnable on
their own.

In order to get this application up and running on your local machine, follow the steps below.

1. Clone the repository from GitHub:

   ```shell
   git clone https://github.com/saeedNW/node.js-grpc.git
   ```

2. Running `project 01`

   1. Navigate to the project directory:

      ```shell
      cd node.js-grpc/project_01
      ```

   2. Install project dependencies:

      ```shell
      npm install
      ```

   3. Run service application

      ```shell
      npm run dev:server
      ```

   4. Run client application

      ```shell
      npm run dev:client
      ```

3. Running `project 02`

   1. Running service:

      1. Navigate to the project service directory:

         ```shell
         cd node.js-grpc/project_02/services/products
         ```

      2. Install project dependencies:

         ```shell
         npm install
         ```

      3. Run service application:

         ```shell
         npm run dev
         ```

   2. Running client:

      1. Navigate to the project client directory:

         ```shell
         cd node.js-grpc/project_02/client
         ```

      2. Install project dependencies:

         ```shell
         npm install
         ```

      3. Run service application:

         ```shell
         npm run dev
         ```

## API Endpoints

After running the `project 02` client application, you can send http request to these endpoints
through the postman application. You can also find the postman collection json file related to
this project in the project client directory.

- **GET /products/list** : retrieve products list.
- **GET /products/single/:id** : retrieve single product data.
- **POST /products/new** : Create a new product.
- **PUT /products/update** : Update a product data.
- **DELETE /products/remove/:id** : Remove a product.

## Contributors

We would like to thank the following individuals who have contributed to the development of this application:

![avatar](https://images.weserv.nl/?url=https://github.com/erfanyousefi.png?h=150&w=150&fit=cover&mask=circle&maxage=5d)
‎ ‎
‎ ![avatar](https://images.weserv.nl/?url=https://github.com/saeedNW.png?h=150&w=150&fit=cover&mask=circle&maxage=5d)

[**Erfan Yousefi - Supervisor and instructor of the node.js programming course**](https://github.com/erfanyousefi/)

[**Saeed Norouzi - Back-end Developer**](https://github.com/saeedNW)
