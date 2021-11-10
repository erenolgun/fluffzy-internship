# Fluffzy Internship Assignment

This project is developed for the assignment of the Fluffzy Product Studio's internship application. The main idea of the project is searching a photo using an entered keyword by user with Unsplash API. 

## When you starting

First of all, every developer that wants to update or review this project must create a developer account on [Unsplash Developer Website](https://unsplash.com/developers). After that create a new application for the project.

When you download or clone the project you must install necessary packages with using `npm install`. After that you need to create a `.env` file for using API endpoints properly. Then, with using `Access Key` and `Secret Key` that are automatically created for an application on the Unsplash, create variables in the `.env` file as below:

REACT_APP_UNSPLASH_API_KEY=`your_access_key_from_unsplash`\
REACT_APP_UNSPLASH_SECRET_KEY=`your_secret_key_from_unsplash`

## Unsplash API Documentation

You can find comprehensive documantation file from here: [https://unsplash.com/documentation](https://unsplash.com/documentation)

This README file explains how you can search for photos with a keyword, how you can like photos, how you can unlike photos and how you can sign in using the API.

### Log in

For the log in process, you need to create a specific acces token to each user. With that way, you can control which user has logged in and which photos are liked by the user. For this operation, you need to redirect to user `https://unsplash.com/oauth/authorize` base url with `client_id`, `redirect_uri`, `response_type` and `scope`parameters.

`client_id` parameter is your access key which is created by Unsplash.

`redirect_uri` parameter is a URI that you specify in the application dashboard. It will be used for handling user authorization.

`response_type` parameter needs to be used with a value of `code`. This will be our response type of authorization.

`scope` parameter helps to take necessary permission. The values will be public as default and write_likes for like a photo.

After redirecting user to `https://unsplash.com/oauth/authorize?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&redirect_uri=http://localhost:3000/&response_type=code&scope=public+write_likes` and user accept to give permissions for the application, user will be automatically redirect to a link that includes specific authorization code. 

With using that authorization code that is included in the redirected url, you need to make a `POST` request to `https://unsplash.com/oauth/token` base url with `client_id`, `client_secret`, `redirect_uri`, `code` and `grant_type` parameters.

`client_id` parameter is your access key which is created by Unsplash.

`client_secret` parameter is your secret key which is created by Unsplash.

`redirect_uri` parameter is a URI that you specify in the application dashboard. It will be used for handling user authorization.

`code` parameter is an authorization code which can be achieved from redirected url and specific for each user.

`grant_type` parameter needs to be used with a value of `authorization_code`.

After a successful request and response, you will be able to reach specific access token for the user. With checking if there is a specific token or authorization code on the application, you can be sure that whether user is logged in or not.

## 

### Search photo with a keyword

`GET /search/photos`

The base url for searching photo is `https://api.unsplash.com/search/photos`. Adding some parameters like `page`, `per_page`, `query`, `client_id`, and `access_token` to this base url makes your request more specific. 

`page` parameter gets specific result page for the entered keyword.

`per_page` parameter sets how many results are shown to you per page.

`query` parameter takes the specific keyword and gets results that are related with the keyword.

`client_id` parameter is your access key which is created by Unsplash.

`access_token` parameter is specific to the user and allows the search results to be returned specifically to the user.

After using all these parameters you must send a `GET` request to `https://api.unsplash.com/search/photos?page=1&per_page=30&query=${value}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}&access_token=${user_token}`.

## 

### Like a photo

`POST /photos/:id/like`

To like a photo, every user must log in to application with their Unsplash account. Unless user logged in, the like functionality will not be useable. Also, if you want to make like operation, you need to take a permission from user in the log in process. This can be done in the `POST` request to url that is specified in the log in process with `scope=public+write_likes` parameter. 

The base url for liking a photo is `https://api.unsplash.com/photos/:id/like`. Besides, you need to add `access_token` parameter to this url.

`access_token` parameter is specific to the user and with that token you can easily set which photos are liked by user.

After adding these parameter to base url, you need to send a `POST` request to `https://api.unsplash.com/photos/${props.photo.id}/like?access_token=${props.user}`. Thereafter, you will be able to like a photo for the logged in user, if your url and parameters are okey and the photo is not liked before.

## 

### Unlike a photo

`DELETE /photos/:id/like`

To unlike a photo, every user must log in to application with their Unsplash account. Unless user logged in, the unlike functionality will not be useable. Also, if you want to make unlike operation, you need to take a permission from user in the log in process. This can be done in the `POST` request to url that is specified in the log in process with `scope=public+write_likes` parameter. 

The base url for unliking a photo is `https://api.unsplash.com/photos/:id/like`. Besides, you need to add `access_token` parameter to this url.

`access_token` parameter is specific to the user and with that token you can easily set which photos are unliked by user.

After adding these parameter to base url, you need to send a `DELETE` request to `https://api.unsplash.com/photos/${props.photo.id}/like?access_token=${props.user}`. Thereafter, you will be able to unlike a photo for the logged in user, if your url and parameters are okey and the photo is liked before.

## Application Documentation

This application is fully created with using React and Tailwind CSS. Also, coded as be responsive on the each type of screen. When a user opens the project, simply, there will be a searchbar for the entering a keyword. 

As I said before, application checks an authorization code to determine whether user logged in or not. When user click `Log in` button on the page, all authorization process are done programmatically. After everything okey and user gives permissions, application saves user authorization code and access token to local storage. With that way, application check easily whether there is an authorization code or not. If user wants to log out, these saved informations on the local storage are cleared. Because there is no authorization code, application can determine that the user is not logged in.

If user is not logged in the application, he/she can makes search with a keyword. But the user will not be able to like or unlike a photo. If user logged in, when he/she hover on the search results, there will be a black layout on the image with an icon and text information as `Like` or `Unlike`. With clicking these texts, user can easily like or unlike a photo.

If user tries to search a photo without entering a keyword, the application gives an information on the screen as `Please enter a keyword to search a photo!`. If user tries to search a photo with a meaningless keyword and if there are not any search result, the application gives an information on the screen as `There is no result with a keyword that you entered.`.

When user clicks on the input are, if there are any search history, these last 5 search history can be seen and can be choosen by the user. For example, assume that there is search history as `ocean`, `office`, `people`, `paris` and `pet`. When the user click on the input area, these 5 search history can be seen as a suggestion. If the user clicks on `ocean` for example, input value will be automatically `ocean`. When user starts to write on the input are, assume that he/she writes `p` as a value. Because of `p` value, `people`, `paris` and `pet` suggestions can be available on the suggestion area. If user writes `pe` on the input area, `people` and `pet` suggestions will be available on the suggestion area.
