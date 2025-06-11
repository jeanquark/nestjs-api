/* eslint-disable prettier/prettier */
// src/cats/schemas/cat.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// export type CatDocument = Cat & Document;

@Schema({
    timestamps: true, toJSON: {
        transform: function (doc, ret) {
            delete ret.password;
            return ret;
        }
    }
})
// @Schema()
export class User extends Document {
    @Prop({ required: true, maxlength: 100 })
    firstname: string;

    @Prop({ required: true })
    lastname: string;

    @Prop({
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    is_verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);