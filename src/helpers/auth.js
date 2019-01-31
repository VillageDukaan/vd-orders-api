import firebase from "firebase";
import firebaseAdmin from "firebase-admin";
import { isEmpty } from "lodash";

import { config } from "../config/firebase";

firebase.initializeApp(config);
firebaseAdmin.initializeApp(config);

export const checkAuth = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (isEmpty(authorization)) res.sendStatus(401);

  try {
    const token = authorization.replace("Bearer ", "");
    const isValid = await firebaseAdmin.auth().verifyIdToken(token);
    if (!isEmpty(isValid)) next();
  } catch (error) {
    res.sendStatus(401);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    const token = await firebase.auth().currentUser.getIdToken(true);
    res.json({ access_token: token });
  } catch (error) {
    res.sendStatus(400);
  }
};

export const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
  }
};
