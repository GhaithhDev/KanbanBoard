import { Priority } from "../enums/priority";

export class CreateCardDto {
    title!: string;
    parentColumnId!: string;
    boardid!: string;
    description?: string;
    priority?: Priority;
}