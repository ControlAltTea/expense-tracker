const app = require("../src/app");

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is Listening to ${process.env.PORT}`);
});
