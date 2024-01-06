import User from "../models/userModel";

class UserRepository {
  static instance;
  constructor() {
    if (UserRepository.instance) {
      return UserRepository.instance;
    }
    UserRepository.instance;
  }

  async findUserForProtect(id) {
    await User.findById(decoded.userId).select("-password");
  }
  async findByEmail(email) {
    return await User.findOne(email);
  }
  async createUser(name, email, password) {
    await User.create({
      name,
      email,
      password,
    });
  }
}
export default new UserRepository();
