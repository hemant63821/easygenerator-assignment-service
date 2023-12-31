import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User {
    @Prop({ type : String})
    name: string;

    @Prop({ type : String, required : true, unique : true, index : true})
    email: string;

    @Prop({ type : String, required : true, unique : true})
    password: string;

    @Prop({type  : Boolean, default : false})
    isUserBlocked: boolean;
};

export const UserSchema = SchemaFactory.createForClass(User)

