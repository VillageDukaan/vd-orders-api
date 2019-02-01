import { isEmpty } from "lodash";

export const checkAuth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const { firebase } = req.app.locals;
    if (isEmpty(authorization)) res.sendStatus(401);

    const token = authorization.replace("Bearer ", "");
    await firebase.auth().signInWithCustomToken(token);
    next();
  } catch (error) {
    const { logger } = req.app.locals;
    logger.error(error);
    res.sendStatus(401);
  }
};

export const getToken = async req => {
  try {
    const authorization = req.headers.authorization;
    const { firebase } = req.app.locals;
    const token = authorization.replace("Bearer ", "");
    return await firebase.auth().signInWithCustomToken(token);
  } catch (error) {
    const { logger } = req.app.locals;
    logger.error(error);
    return null;
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { firebase, firebaseAdmin } = req.app.locals;
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const token = await firebaseAdmin.auth().createCustomToken(user.uid);
    res.json({ access_token: token });
  } catch (error) {
    const { logger } = req.app.locals;
    logger.error(error);
    res.sendStatus(400);
  }
};

export const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { firebase } = req.app.locals;
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    res.sendStatus(200);
  } catch (error) {
    const { logger } = req.app.locals;
    logger.error(error);
    res.sendStatus(400);
  }
};
