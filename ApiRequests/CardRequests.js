const BASE_URL = 'http://172.20.10.3:3000';

export const CardAPI = {

    createCard : async function(createBoardObject) {
        const result = await fetch(
            BASE_URL + '/card/create',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(createBoardObject)
            }
        )
        return result.json()
    },

    editCard : async function(editCardObject){
         const result = await fetch(
            BASE_URL + '/card/editCard',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(editCardObject)
            }
        )
        return result.json()
    }
}