# Fluffzy Internship Assignment

This project is developed for the assignment of the Fluffzy Product Studio's internship application. The main idea of the project is searching a photo using an entered keyword by user with Unsplash API. 

## When you starting

First of all, every developer that wants to update or try this project must create an developer account on [Unsplash Developer Website](https://unsplash.com/developers). After that create an application for the project.

When you download or clone the project you must install necesseary packages with using `npm install`. After that you need to create a `.env` file for using API endpoints properly. Then, with using `Access Key` and `Secret Key` that are automatically created for an application on the Unsplash, create variables in the `.env` file as below:

REACT_APP_UNSPLASH_API_KEY=`your_access_key_from_unsplash`\
REACT_APP_UNSPLASH_SECRET_KEY=`your_secret_key_from_unsplash`

## Unsplash API Documentation

You can find comprehensive documantation file from here: [https://unsplash.com/documentation](https://unsplash.com/documentation)

This README file explains how you can search for photos with a keyword, how you can like photos, how you can unlike photos and how you can sign in using the API.

### Log in

For log in process, we need to create a specific acces token to each user. With that way, we can control which user has logged in and which photos are liked by the user. For this operation, we need to redirect to user `https://unsplash.com/oauth/authorize` base url with `client_id`, `redirect_uri`, `response_type` and `scope`parameters.

`client_id` parameter is your access key which is created by Unsplash.

`redirect_uri` parameter is a URI that you specify in the application dashboard. It will be used for handling user authorization.

`response_type` parameter needs to be used with a value of `code`. This will be our response type of authorization.

`scope` parameter helps to take necessary permission. The values will be public as default and write_likes for like a photo.

After redirecting user to `https://unsplash.com/oauth/authorize?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&redirect_uri=http://localhost:3000/&response_type=code&scope=public+write_likes` and user accept to give permissions for the application, user will be automatically redirect to a link that includes specific authorization code. 

With using that authorization code that is included in the redirected url, we need to make a `POST` request to `https://unsplash.com/oauth/token` base url with `client_id`, `client_secret`, `redirect_uri`, `code` and `grant_type` parameters.

`client_id` parameter is your access key which is created by Unsplash.

`client_secret` parameter is your secret key which is created by Unsplash.

`redirect_uri` parameter is a URI that you specify in the application dashboard. It will be used for handling user authorization.

`code` parameter is an authorization code which can be achieved from redirected url and specific for each user.

`grant_type` parameter needs to be used with a value of `authorization_code`.

After a successful request and response, we will be able to reach specific access token for the user. With checking if there is a specific token on the application, we can be sure that whether user is logged in or not.

### Searching photo with a keyword

`GET /search/photos`

The base url for searching photo is `https://api.unsplash.com/search/photos`. Adding some parameters like `page`, `per_page`, `query`, `client_id`, and `access_token` to this base url makes your request more specific. 

`page` parameter gets specific result page for the entered keyword.

`per_page` parameter sets how many results are shown to you per page.

`query` parameter takes the specific keyword and gets results that are related with the keyword.

`client_id` parameter is your access key which is created by Unsplash.

`access_token` parameter is specific to the user and allows the search results to be returned specifically to the user.

After using all these parameters you must send a `GET` request to `https://api.unsplash.com/search/photos?page=1&per_page=30&query=${value}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&access_token=${user_token}`.
