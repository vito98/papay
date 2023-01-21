let memberController = module.exports;

memberController.home = (req, res) => {
  console.log("GET cont.home");
  res.end("home sahifasidasiz");
};

memberController.signup = (req, res) => {
  console.log("POST cont.signup");
  res.end("signup sahifasidasiz");
};

memberController.login = (req, res) => {
  console.log("POST cont.login");
  res.end("login sahifasidasiz");
};

memberController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.end("logout sahifasidasiz");
};
