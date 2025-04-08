import { INote, NoteModel } from "../models/note.model";
import { UserModel } from "../models/user.models";

export class noteService {
   async createNote(data: INote, dataUser: any): Promise<INote> {
      if (!data || !dataUser) throw new Error('Data and dataUser error')
      if (!data.title) throw new Error('vui lòng điền title')
      if (!data.content) throw new Error('vui lòng điền content')
      if (!dataUser) throw new Error('User not found')
      const authors: any = await UserModel.findById(dataUser.id)
      if (!authors) throw new Error('Author not found')
      const newNote = await NoteModel.create({
         title: data.title,
         content: data.content,
         author: dataUser.id
      })
      await newNote.save()
      return newNote
   }
   async allNote(): Promise<INote[]> {

      return await NoteModel.find()
   }
   async noteById(ID: string, userToken: any): Promise<INote> {
      const note: any = await NoteModel.findById(ID);
      const userLegit = userToken.id
      if(note?.viewers.includes(userLegit) &&note?.author.toString()!== userLegit) 
         throw new Error("Bạn không có quyền truy cập")
      return note
   }
   async updateNote(data: INote, ID: any): Promise<INote> {
      const noteId = await NoteModel.findById(ID)
      if (!noteId) throw new Error('Note Id not found')
      if (!data) throw new Error('data not found')
      noteId.title = data.title || noteId.title
      noteId.content = data.content || noteId.content
      await noteId.save()
      return noteId
   }
   async deleteNote(ID: string): Promise<INote> {
      const noteId = await NoteModel.findByIdAndDelete(ID)
      if(!noteId) throw new Error('Note Id not found')
      await noteId.save()
      return noteId
   }
}