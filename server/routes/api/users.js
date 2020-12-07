const mongoose = require("mongoose");
const router = require("express").Router();
const passport = require("passport");

const auth = require("../auth");

const Users = mongoose.model("Users");

router.post("/", auth.optional, (req, res, next) => {
  const {
    body: { user },
  } = req;

  if (!user.email) {
    return res.status(422).json({
      error: {
        email: "is required",
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      error: {
        password: "is required",
      },
    });
  }

  const finalUser = new Users();
  finalUser.email = user.email;
  finalUser.fullname = user.fullname;
  finalUser.username = user.username;
  finalUser.setPassword(user.password);
  return (
    finalUser
      .save()
      .then(() => res.json({ user: finalUser.toAuthJSON() }))
      .catch((err) => res.json({ err }))
  );
});

router.post("/login", (req, res, next) => {
  console.log(JSON.stringify(req.body));
  const {
    body: { user },
  } = req;
  if (!user.email) {
    return res.status(422).json({
      error: {
        email: "is required",
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      error: {
        password: "is required",
      },
    });
  }

  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();

        return res.json({ user: user.toAuthJSON() });
      }

      return res.json({ user: "Invalid Credentials" });
    }
  )(req, res, next);
});

router.get("/current", auth.required, (req, res, next) => {
  const {
    payload: { id },
  } = req;
  return Users.findById(id).then((user) => {
    if (!user) {
      return res.sendStatus(400);
    }
    return res.json({ user: user.toAuthJSON() });
  });
});

module.exports = router;
