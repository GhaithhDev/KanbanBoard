import { BOARD_COLORS } from "../consts/boardColors";

export function getColorFromNum(num: number) : string | undefined {

    const color = BOARD_COLORS.filter( (boardColor) => boardColor.id === num.toString()  )
    if (!color || color.length <= 0){
        return;
    }
    return color[0].hex;
}