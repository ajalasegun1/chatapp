# Chat App

This is a simple react native chat application that uses **stream.io**. The focus of this app is to implement a chat app where users can chat either one on one or in a group. This app is very basic. It uses context for state management. The state is not persisted and also the image is generated by using a random image generator url. So if you see different images loading don't be alarmed.

# Instruction

- Clone the repo and run either yarn install or npm install
- You have to signup on stream.io to get your api key. When you do, create a .env file and give it a key named **STREAM_KEY** and pass it the value of your api key. Please note the app you create should be a development build and not a production build on stream.io dashboard.
- Login with the with the name **john** or **james** and use the email of **john@gmail.com** or **james@gmail.com** respectively.
- To test, run your android and ios emulators. Login as john on one and as james on another. Then you can start chatting to see how the feature works
