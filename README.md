## Description

---

Web browser multiplayer turn based dice game, a varian of Liar's Dice.

**Hosted at:
<br>
https://pkaodev.github.io/Patudo-v0/**
<br>
<br>
Unfortunately party mode has had to been been temporarily disabled due to an issue with the production build
<br>
<br>
backend currently hosted on google cloud run
<br>
<br>

For the best experience, view in a **mobile browser**.

<br>

## Tech stack

---

- ReactJS
- ExpressJS
- Firebase authentication
- Firestore database


<br>


## Installation

---

You will need a firestore database and a firebase project.

In */frontend/* create a **.env.local** file with the following content (replace the values with your own):


```
#Firebase auth config

VITE_FIREBASE_API_KEY=XXXXXXXXXX

VITE_FIREBASE_AUTH_DOMAIN=XXXXXXXXXX

VITE_FIREBASE_PROJECT_ID=XXXXXXXXXX

VITE_FIREBASE_STORAGE_BUCKET=XXXXXXXXXX

VITE_FIREBASE_MESSAGING_SENDER_ID=XXXXXXXXXX

VITE_FIREBASE_APP_ID=XXXXXXXXXX

VITE_FIREBASE_MEASUREMENT_ID=XXXXXXXXXX

#Firestore collection names

VITE_DB_LOBBIES=lobbies
VITE_DB_GAMES=games
VITE_DB_HISTORY=history
VITE_DB_PRIVATE=private

#Local API address

VITE_API_ADDRESS=http://localhost:8001/tester
```

In */api/* create a **.env** file:
```
# Firebase SDK
FIREBASE_ADMIN_SDK_DATABASE_URL=XXXXXXXXXX
GOOGLE_APPLICATION_CREDENTIALS="./serviceAccountKey.json"

# Firebase auth config
FIREBASE_API_KEY=XXXXXXXXXX
FIREBASE_AUTH_DOMAIN=XXXXXXXXXX
FIREBASE_PROJECT_ID=XXXXXXXXXX
FIREBASE_STORAGE_BUCKET=XXXXXXXXXX
FIREBASE_MESSAGING_SENDER_ID=XXXXXXXXXX
FIREBASE_APP_ID=XXXXXXXXXX
FIREBASE_MEASUREMENT_ID=XXXXXXXXXX

# Firestore collection names
DB_LOBBIES=lobbies
DB_GAMES=games
DB_HISTORY=history
DB_PRIVATE=private
```
Additionally, you will need to create a **serviceAccountKey.json** file in the */api/* directory. You can get this file from your firebase project settings.

After that run 
`npm install` in both */api/* and */frontend/* directories.

To start the api run `npm run start` in the */api/* directory.

To start the frontend run `npm run dev` in the */frontend/* directory.





