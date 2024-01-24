<div align="center">

# Thrifty Pet
**Created by [Judy Ye](https://github.com/judy0ye)**

[![LinkedIn](https://img.shields.io/badge/Judy-blue?style=for-the-badge&logo=LinkedIn&logoColor=black)](https://www.linkedin.com/in/judy0ye)


</div>

## 📝 Description

This app is the back-end server for [thrifty-pet-fe](https://github.com/judy0ye/thrifty-pet-fe). It includes all the API endpoints needed to handle CRUD operations for notes and Chewy products/links. MongoDB Atlas is used to store all the notes and Chewy product data. With Bright Data acting as a proxy, Puppeteer is used to programmatically scrape products currently on the app. The data is regularly scraped and stored on MongoDB using Cron Jobs.

## Getting started

### 🧑‍💻 Installation

1. Clone down this repository at the same level as the frontend repository.
    - `git clone git@github.com:judy0ye/thrifty-pet-be.git`
2. Change into the new directory.
    - `thrifty-pet-be`
3. Install the dependencies.
    - `npm install`
4. Start the server.
    - `nodemon`

### Endpoints

#### For Notes:
| url | verb | options | sample response |
| ----|------|---------|---------------- |
| `/api/v1/notes/get` | GET | not needed | Object of 'notes' with an Array of all existing notes: `{notes: [ {"_id": "65af4d2e48b4f00056412d29", "product": "Blue Buffalo Dry Food", "description": "My dog loves it"}, {...}, ... ]` |
| `/api/v1/notes/create` | POST | `{product: <String>, description: <String>}` | Add new note: `{note: { "product": "fish snacks", "description": "my cat goes crazy for them" }` |
| `/api/v1/notes/get/:noteId` | GET | not needed | Object of note with single note detail: `{note: {"_id": "65af4d2e48b4f00056412d29", "product": "Blue Buffalo Dry Food", "description": "My dog loves it"}` |
| `/api/v1/notes/update/:noteId` | Patch | `{product: <String>, description: <String>}` | Object of note with single updated note detail: `{note: {"_id": "65af4d2e48b4f00056412d29", "product": "Blue Buffalo Dry Food", "description": "My dog loves it"}` |
| `/api/v1/notes/delete/:noteId` | DELETE | not needed | `{"message":"deleted"}` |
#### For Chewy Products:
| url | verb | options | sample response |
| ----|------|---------|---------------- |
| `/api/v1/products/get` | GET | not needed | Object of 'products' with an Array of all existing scraped products: `{products: [ {"_id": "65ae0d908f2c18264d587084", "url": "https://www.chewy.com/weruva-mack-jack-mackerel-grilled/dp/34484", "image": "https://image.chewy.com/is/image/catalog/49303_MAIN._AC_SL600_V1643071023_.jpg","title": "Weruva Mack & Jack..", "currentPrice": 39.84, "originalPrice": 42.96, "miscInfo": ["Size: 3-oz can, case of 24"], "priceHistory": [ {"price": 39.84, "date": "2024-01-22T06:39:12.458Z", "_id": "65ae0d908f2c18264d587085"},{...}, ...], "lowestPrice": 39.84, "highestPrice": 39.84, "averagePrice": 39.84, "createdAt": "2024-01-22T06:39:12.749Z", "updatedAt": "2024-01-23T08:11:42.367Z"}, {...}, ... ]` |
| `/api/v1/products/create` | POST | `{productUrl: <String>` | Add link: `{product: { "url": "https://www.chewy.com/weruva-mack-jack-mackerel-grilled/dp/34484", "image": "https://image.chewy.com/is/image/catalog/49303_MAIN._AC_SL600_V1643071023_.jpg", "title": "Weruva Mack & Jack..", "currentPrice": 39.84, "originalPrice": 42.96, "miscInfo": ["Size: 3-oz can, case of 24"], "priceHistory": [ {"price": 39.84, "date": "2024-01-22T06:39:12.458Z", "_id": "65ae0d908f2c18264d587085"}], "lowestPrice": 39.84, "highestPrice": 39.84, "averagePrice": 0,  "_id": "65b02070a16b30afed5554b1", "createdAt": "2024-01-22T06:39:12.749Z", "updatedAt": "2024-01-23T08:11:42.367Z"} ` |
| `/api/v1/products/get/:productId` | GET | not needed | Object of product with single product detail: `{product: {"_id": "65ae0d908f2c18264d587084", "url": "https://www.chewy.com/weruva-mack-jack-mackerel-grilled/dp/34484", "image": "https://image.chewy.com/is/image/catalog/49303_MAIN._AC_SL600_V1643071023_.jpg","title": "Weruva Mack & Jack..", "currentPrice": 39.84, "originalPrice": 42.96, "miscInfo": ["Size: 3-oz can, case of 24"], "priceHistory": [ {"price": 39.84, "date": "2024-01-22T06:39:12.458Z", "_id": "65ae0d908f2c18264d587085"},{...}, ...], "lowestPrice": 39.84, "highestPrice": 39.84, "averagePrice": 39.84, "createdAt": "2024-01-22T06:39:12.749Z", "updatedAt": "2024-01-23T08:11:42.367Z"}` |


## 💻 Technologies Used
<div align='center'>
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /> 
  <img src="https://img.shields.io/badge/Express-000?logo=express&logoColor=fff&style=for-the-badge" /> 
  <img src="https://img.shields.io/badge/Node.js-393?logo=nodedotjs&logoColor=fff&style=for-the-badge" /> 
  <img src="https://img.shields.io/badge/Nodemon-76D04B?logo=nodemon&logoColor=fff&style=for-the-badge" /> 
  <img src="https://img.shields.io/badge/Puppeteer-40B5A4?logo=puppeteer&logoColor=fff&style=for-the-badge" /> 
  <img src="https://img.shields.io/badge/Cheerio-F88900?logo=cheerio&logoColor=fff&style=for-the-badge" /> 
  <img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=fff&style=for-the-badge" /> 
  <img src="https://img.shields.io/badge/Mongoose-800?logo=mongoose&logoColor=fff&style=for-the-badge" /> 
  <img src="https://img.shields.io/badge/Heroku-430098?logo=heroku&logoColor=fff&style=for-the-badge" /> 
</div>
