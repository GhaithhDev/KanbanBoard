
export type boardAuthorizedUser = {
    username: string,
    color: string
}

export class Board {
    id!: string;
    title!: string;
    isCreating!: boolean;
    authorizedUsers!: boardAuthorizedUser[]
}