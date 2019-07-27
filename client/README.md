## Table Of Contents
- [About-this-project](#About-this-project)
- [Directory-Strucure](#Directory-Structure)
- [Getting-Started](#Getting-Started)
- [Dependancies](#Dependancies)
## About this Project
### What is MEME?
 
* User can load new image from his/her mobile phone from add image screen.
* Once the user picks up an image from mobile, the user can add two texts(Top and bottom text) on the loaded image into add text screen. From this screen, the user can change the image as well. 
* Once the user is done with text then they can save that particular image with text and user can also change color and move text and  save into his/her phone.
* User can also see this all the edited(Bottom and top text) images with this application into my memes screen. 

  
 
## Directory Structure
```
  +-- /screens
    +-- [All Component Use In MEME Generator]
  +-- /components
    +-- [Menu Drawer and Menu Button]
  +-- /navigation
    +-- [DrawerNavigator]
  +--/service 
     +-- [for request and response of api call]
  +--/config [Config File]
```
## Getting started
1. git clone https://github.com/Nainapatel/MEME_Generator_ios
2. Install NodeJS 
3. Install react-native-cli globally on your computer
   npm install -g react-native-cli
4. Enter the project folder and run the following command to get all right files in the right place
     `npm install`
5. Install an IDE(like visual studio code),visual studio is recommended,beacuse it has great Commandline integration and javascript building/debugging features.
6. Conect Android Device with your computer and device is in devlopment mode.
7. react-native start,react-native run-android and react-native log-android Execute these command in commandline of visual studio code.
8. Open the project in visual studio code.
9. The apllication can be accessed in connected device at localhost:8081.
### `react-native start`
Runs the app in the development mode.
### `react-native run-android`
View Application in Connected device 
### `npm test`
Run example app tests with:
npm test
Note: Jest testing does not yet work on node versions after 0.10.x.
### `npm run build`
Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
## Learn More
You can learn more in the [Create React Native App documentation](https://facebook.github.io/react-native/docs/getting-started).
To learn React Native, check out the [React documentation](https://facebook.github.io/react-native/docs/tutorial).
### Deployment
This section has moved here: https://facebook.github.io/react-native/docs/signed-apk-android
## Dependancies
* Open package.json to see all development and production dependencies or run npm ls in the project root directory for all installed dependencies.