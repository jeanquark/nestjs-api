/* eslint-disable prettier/prettier */
// src/cats/schemas/cat.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CatDocument = Cat & Document;

@Schema()
export class Cat {
    @Prop({ required: true })
    race: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    age: number;

    @Prop({ required: true })
    gender: string;

    @Prop({ required: true })
    color: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);