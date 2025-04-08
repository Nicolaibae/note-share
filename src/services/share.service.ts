
import { INote, NoteModel } from "../models/note.model"
import { UserModel } from "../models/user.models"

interface responseData<T> {
    message: string,
    data: T
}
interface inputShareDTO {
    userToken: string,
    userSharebyid: string,
    idNote: string
}
interface inputCheckShareDTO {
    idUser: string,
    idNote: string

}


export class ShareService {
    async share(Data: inputShareDTO): Promise<responseData<INote>> {
        const { userToken, userSharebyid, idNote } = Data
        if (!idNote) throw new Error("vui lòng điền idNote")
        const note = await NoteModel.findById(idNote)
        if (!note) throw new Error("Note not found")
        if (note?.author.toString() !== userToken) throw new Error("Tác giả không khớp")
        if (!userSharebyid) throw new Error("vui lòng điền userSharebyid")
        const personShare = await UserModel.findById(userSharebyid)
        if (!personShare) throw new Error("không tìm thấy user")
        if (note.viewers.includes(userSharebyid)) throw new Error("Bài note đã được share")
        note.viewers = [...note.viewers, userSharebyid]
        await note.save()
        return {
            message: "share thành công",
            data: note
        }

    }
    async checkshare(data: inputCheckShareDTO): Promise<responseData<boolean>> {
        const { idUser, idNote } = data

        if (!idNote) throw new Error("vui lòng điền id note")
        const note = await NoteModel.findById(idNote)

        if (!note) throw new Error("không tìm thấy bài note")
        if (!note.viewers.includes(idUser)) throw new Error("bạn không thể xem bài note")

            return {
                message:"Success",
                data:true
            }
    }
}