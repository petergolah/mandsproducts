# SSDE - Full Stack - Next, Typescript, GraphQL 

## Candidate Brief

### Interview Process

- CV Screen
- Phone Interview ~30-45mins
- Take home tests (Described Below)
	- Technical ~2hours
	- System Design ~1hour
- Assessment Center
	- Leadership & Culture 1hour
	- System Design 30mins
	- Technical 1hour
- Decision

---

## Technial test

The purpose of this test is for you to demonstrate your knowledge of the next, typescript and graphql by constructing a small app. Along with this brief you will have been provided with a docker image that exposes a graphql api with some mock data and some badge images.

The project is to build a basic product grid that works across all devices and that links through to a product information page.

The test is designed to take around 2 hours but there is no time limit. We suggest completing the tasks in order and submitting what you have done if you choose to end at 2 hours and haven't finished.

### Instructions:

1. Make sure you are able to run the graphql api docker image: chrismns/tech-test-mock-server:0.1.0 [https://hub.docker.com/r/chrismns/tech-test-mock-server](https://hub.docker.com/r/chrismns/tech-test-mock-server){target="_blank"} port 3001. GraphQL playground is enabled [http://localhost:3001/graphql](http://localhost:3001/graphql){target="_blank"}
2. Build a product listing page using the productList query.
	1. The products should be displayed on a grid appropriate for the device. 
	2. For each product show the: name, product image, current price and original price (if there is one)
	3. Image keys can be resolved with https://asset1.cxnmarksandspencer.com/is/image/mands/${image_key}
3. When a customer selects a product, use the product(id: $id) query to fetch the product data and present a product details page. 
	1. Show the name, image, and price information as in the product grid. Also add the product information text and a back button. 
4. Amend the product listing page to include offer badges using the process described below.
    1. Using the user(id: $id) query, fetch the offers and available_badges for the given user id. (NB: No auth required here. User ids 1-5 are available for testing with different configurations).
    2. Combine the "offers_ids" from the product with the user offers response using the following process:
        1. Decode the available_badges e.g. "sale:PRIORITY_ACCESS||loyalty:SLOTTED,BONUS" as detailed below:
            1. Split the string on "||" to get available badges in priority order (high to low).
            2. For each badge string split on ":". The first half is the badge name. The second half is the comma delimited list of badge types that should use the given badge name.
            3. The assets for the badges should have been provided to you and follow the naming convention "{badge name}_icon.jpg".
		2. For each of the "offer_ids" from a product from check to see if the user has any applicable offers (where the ids are the same).
		3. If there are applicable offers, check if the offer type has a badge associated with it. Show the *highest priority* badge (as defined by the order of available_badges) if more than match.
5. Demonstrate testing.
6. Build your app in to a docker image.
7. Use docker compose to combine the api image with your web image.

### Sample Data
Sample users with ids 1,2,3,4, and 5) are available with different combinations of offers and available badges.
All the products returned from the productList query are availible from the product(id: $id) query

### Other Requirements
- Use typescript where possible
- The code you submit must build and run (including the api) without errors
- Provide instructions for setting up all parts of your solution from a fresh clone
- Clean up any code or config that isn't required
- It's not required that you support old browsers
- Keep track of the amount of time you spend working on the solution

### How to submit
Please provide either a link to a public or private git repo or a zipped folder containing the repo.
If you don't complete all the tasks please include a readme describing the steps you would need to take to finish.

---

## System Design Test

## Fun with Funds

### Introduction

In this exercise, you will be designing a simple asset management system, which allows users of the system to browse their portfolio, search for assets to buy and place buy or sell orders for assets.

The system will act as a broker. Matching orders to buy with orders to sell. This is an asynchronous process, as there might not be any units of an asset available for sale, at the time that a user creates an order to buy a specified number of assets.

For example, User A might place an order to buy 1000 units of "Equity Fund A", now, at the moment in time this buy order is created, there might only be 891 units available for sale, and it becomes the responsibility of the system to act as a broker, that monitors future sales and fulfils the order at the earliest possible occasion.

### Vocabulary

In the context of this exercise, we'll use the following vocabulary

- An 'Asset' is an entity that can be traded. An assert has an associated list value, and a user can hold any number of the same assert. For example, a user might hold 235 units of an asset, each unit having a value of £1.25, giving a total value of £293.75
- A portfolio is a users collection of assets
- A "buy order" is a request to buy a specified number of an asset available in the database
- A "sell order" is a request to sell a specified number of an asset that is currently held in a users portfolio
- The asset database is all the assets which can be traded in the system. Regardless of the availability of assets. Meaning,  an asset will be in the database, even if there are no units currently available to buy

### Requirements

It is your task to design a system which makes the following functionality available to a user

- List all Assets held in a users portfolio
- List all assets available in the system
- Users must be able to create a "sell order", with the ambition of selling a specified number of units of assets in their portfolio
- Users must be able to create a "buy order", with the ambition to buy a specified number of an asset in the asset database
- Continuously update the latest asset prices of assets in the database, by integrating with an external "fire hose" style stream
    - Assume you got an Apache Kafka stream provided, that gives you a continuous feed of asset price movements 
- Your system design must clarify how all your containers relates to each other (container in the C4 sense, see the "your submission" section below)

How you approach this, is completely up to you. You can choose to implement the required capability using any technology and system design paradigm you see fit, microservices, monolithic approach the choice is yours. All we are looking for is you be able to reason about

- The scalability of the system
- The reliability of the system
- The consistency of the system
- Your observability strategy
- Security considerations

## Your submission

You must submit your solution as one, or a series of PDFs, PNGs or SVG. For simplicity, you must design this using the vocabulary and style recommended in the C4 Model.

Please see [https://c4model.com/](https://c4model.com/){target="_blank"}

You must submit a container diagram, and we aren't expecting you to go and create system, component and code level views. But, if you feel it adds value, you could add a system diagram.
