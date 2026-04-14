const BASE_URL = 'http://172.20.10.3:3000';

export const BoardApi = {
    getAllBoards: async function() {
        const result = await fetch(BASE_URL + '/Board')
        return result.json()
    },

    createBoard : async function(createBoardObject) {
        const result = await fetch(
            BASE_URL + '/Board/create',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(createBoardObject)
            }
        )
        return result.json()
    }
}