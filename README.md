## Description

---

Web browser multiplayer turn based dice game, a variant of <a href="https://en.wikipedia.org/wiki/Liar%27s_dice" target="_blank">Liar's Dice</a>.

**Hosted at:
<br>
<a href="https://patudo.netlify.app/" target="_blank">https://patudo.netlify.app/</a>**
<br>
<br>
The REST API is currently hosted on Cloud Run.
<br>
<br>
For the best experience, view in a **mobile browser**.  Really, you'll have a better time on a mobile sized browser.
<br>
<br>
**NOTE!!!**
<br>
Lots of features are currently ~~missing~~ under development.  Everything **should be** playable.
<br>
<br>

## App design

---

- Front end - ReactJS, firebase authentication, and firestore to subscribe to live updates of lobby/game states from the database.
- REST API - ExpressJS, validates player actions and updates the database.
- Database - Firestore


<br>


## Local installation

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
Additionally, you will need to create a **serviceAccountKey.json** (it comes with a different name so you will have to rename it) file in the */api/* directory. You can get this file from your firebase project settings.

After that run 
`npm install` in both */api/* and */frontend/* directories.

To start the api run `npm run start` in the */api/* directory.

To start the frontend run `npm run dev` in the */frontend/* directory.





