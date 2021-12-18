import jwtSign from "./jwt/jwtSign";
import express, { Request, Response } from "express";
import users from "./utils/usersDb";

const app = express();

app.use(express.json());

app.post("/generate_jwt", (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = users.reduce((prev, curr) => {
      if (curr.username === username && curr.password === password) return curr;
      else return prev;
    }, null);
    if (user) {
      const userId = user.userId;
      const accessToken = jwtSign(
        { userId, data: { username: user.username } },
        "15 min"
      );
      return res.send({ accessToken: accessToken, message: "Auth Success!" });
    }
    return res
      .status(401)
      .send({ message: "Username or password is incorrect" });
  } catch (err) {
    console.error(err);
    throw err;
  }
});

app.listen(3001, () => {
  console.log("Auth Server live on https://localhost:3001");
});
