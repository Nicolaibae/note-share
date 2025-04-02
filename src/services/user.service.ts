import { UserModel, IUser } from "../models/user.models";
import bcrypt from "bcryptjs"

export class UserService {
  async createUser(data: IUser): Promise<IUser> {
    if (!data.username) throw new Error('vui lòng điền name')
    const findName = await UserModel.findOne({ username: data.username })
    if (findName) throw new Error("Đã tồn tại tên này")

    if (!data.email) throw new Error('vui lòng điền email')

    if (!data.password) throw new Error("vui lòng điền password")
    const hashPassword = await bcrypt.hash(data.password, 10)

    return await UserModel.create({
      username: data.username,
      email: data.email,
      password: hashPassword
    });
  }

  async getUsers(): Promise<IUser[]> {
    return await UserModel.find();
  }
  async updateUser(data: IUser, ID: any): Promise<IUser> {

    const User = await UserModel.findById(ID)
    if (!User) throw new Error("ID User not found")
    User.username = data.username || User.username;
    User.email = data.email || User.email;
    if (data.password) {
      User.password = await bcrypt.hash(data.password, 10)
    }
    await User.save()

    return User
  }
  async deleteUser(ID: string): Promise<IUser> {
    const User = await UserModel.findByIdAndDelete(ID)
    if (!User) throw new Error("ID User not found")
    await User.save()
    return User
  }
}
