import userRepository from "../repository/userRepository";

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findByEmail({ email });
    if (user && (await user.matchPassword(password))) {
      genToken(res, user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("invalid email or password");
    }
  } catch (error) {
    console.error(error);
  }
};
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await userRepository.findByEmail({ email });

  if (userExists) {
    res.status(400);
    throw new Error("user email already exists");
  }

  const user = userRepository.createUser(name, email, password);

  if (user) {
    generateToken(res, user._id, "user");
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
};

const logOutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: " user logout" });
};

export { authUser, logOutUser, registerUser };
