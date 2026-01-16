exports.loginController = async (req, res) => {
  console.log("inside logincontroller");
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      
      let isuserLoggedin = existingUser ? await bcrypt.compare(password, existingUser.password) : password == existingUser.password;
      if (isuserLoggedin) {
        const token = jwt.sign({ email, role: existingUser.role, userId: existingUser._id }, process.env.JWTSECRET);
        res.status(200).json({ user: existingUser, token });
      }
      else {
        res.status(401).json(`Invalid credentials`);
      }
    } else {
      res.status(401).json(`invalid email ... please register`);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};