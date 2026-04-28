import { Priority } from "../enums/priority";

export class Card {
    id!: string;
    title!: string;
    description!: string;
    priority!: Priority;
    parentColumnId!: string;
    externalWorker!: string;
}