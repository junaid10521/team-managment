import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAQejYUFxRVy74tKTPzrn3R-ztDG4ACo2A",
    authDomain: "m-city-54115.firebaseapp.com",
    databaseURL: "https://m-city-54115.firebaseio.com",
    projectId: "m-city-54115",
    storageBucket: "m-city-54115.appspot.com",
    messagingSenderId: "773831879892",
    appId: "1:773831879892:web:8907e083e224310c"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const firebaseDB = firebase.database();
  const firebaseMatches = firebaseDB.ref('matches');
  const firebasePromotions = firebaseDB.ref('promotions');
  const firebaseTeams = firebaseDB.ref('teams');
  const firebasePlayers = firebaseDB.ref('players');

  export {
      firebase,
      firebaseMatches,
      firebasePromotions,
      firebaseTeams,
      firebasePlayers,
      firebaseDB
  }