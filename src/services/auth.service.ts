import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { IUser, UserModel } from "../models/user.models";




export class authService {
    async Register(data: IUser): Promise<IUser> {

        if (!data.username) throw new Error("vui long dien ten")
        const userAuth = await UserModel.findOne({ username: data.username })
        if (userAuth) throw new Error("đã tồn tại tên này")
        if (!data.email) throw new Error("vui long dien email")
        if (!data.password) throw new Error("vui long dien password")
        const hashPassword = await bcrypt.hash(data.password, 10)
        const newUser = new UserModel({ username: data.username, password: hashPassword })
        await newUser.save()

        return newUser

    }
    async Login(data: IUser): Promise<IUser> {
        if (!data.username) throw new Error("vui long dien ten")
        const user = await UserModel.findOne({ username: data.username })
        if (!user) throw new Error("Không tồn tại người dùng này")
        if (!data.password) throw new Error("vui long dien password")
        const comparePass = await bcrypt.compare(data.password, user.password)
        if (!comparePass) throw new Error("sai mật khẩu")
        console.log(user)
        const accessToken = jwt.sign({ id: user._id, username: user.username }, process.env.ACCESS_TOKEN as string,
            {
                expiresIn: "1h"
            }
        )
        const refreshToken = jwt.sign({ id: user._id, username: user.username }, process.env.REFRESH_TOKEN as string,
            {
                expiresIn: "7d"
            }
        )
        user.accesstoken = accessToken
        user.refreshtoken = refreshToken
        await user.save()
        return user
    }
    async RefreshToken(data: IUser): Promise<IUser> {

        if (!data.refreshtoken) throw new Error("không tôn tại token")
        const decoded: any = jwt.verify(data.refreshtoken, process.env.REFRESH_TOKEN as string)
        if (!decoded) throw new Error("không tông tại token")
        const user = await UserModel.findById(decoded.id)
        if (!user) throw new Error("không tim thay user")
        if (user.refreshtoken !== data.refreshtoken) throw new Error("Token không đúng")
        const newAccessToken = jwt.sign({ id: user._id, username: user.username }, process.env.ACCESS_TOKEN as string, { expiresIn: "1h" })
        const newRefreshToken = jwt.sign({ id: user._id, username: user.username }, process.env.REFRESH_TOKEN as string, { expiresIn: "7d" })
        user.accesstoken = newAccessToken
        user.refreshtoken = newRefreshToken
        await user.save()
        return user
    }
    async Logout(data: IUser): Promise<IUser> {
        if (!data || !data.refreshtoken) throw new Error("Không tồn tại token");
        const decoded: any = jwt.verify(data.refreshtoken, process.env.REFRESH_TOKEN as string)
        if (!decoded) throw new Error("Token không hợp lệ hoặc hết hạn");
        const user = await UserModel.findById(decoded.id)
        if (!user) throw new Error("user not found")

        user.refreshtoken = null
        await user.save()
        return user

    }
    async Profile(data: IUser): Promise<IUser> {
        if (!data || !data.id) throw new Error("Không tồn tại token");
        const user = await UserModel.findById(data.id).select("-password -accesstoken -refreshtoken")
        if (!user) throw new Error("không tìm thấy user")
        return user
    }
}