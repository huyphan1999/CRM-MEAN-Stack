module.exports = {
  port: process.env.PORT || 8080,
  database: "mongodb://127.0.0.1:27017/d09",
  secret: "CNPM",
  facebookAuth: {
    clientID: "1112349835880867", // App ID của bản
    clientSecret: "110cd1dd324a4fc4fd0df075639d2df0", // App Secret của bạn
    callbackURL: "http://localhost:8080/api/auth/facebook/callback",
  },
  googleAuth: {
    clientID:
      "677605661801-fr0cnbnhjq6k50jc2cut4iit1j1euuhh.apps.googleusercontent.com",
    clientSecret: "Evsk3BGSFKpz1MqUuSN8mEly",
    callbackURL: "http://localhost:8080/api/auth/google/callback",
  },
};
