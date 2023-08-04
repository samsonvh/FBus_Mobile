import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  databaseURL: "https://fbus-public-map-default-rtdb.asia-southeast1.firebasedatabase.app"
  //"https://f-bus-map-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
