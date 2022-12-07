import { types } from "../types/types"

const initalState ={
    cheking:true,

}

export const authReducer =(state= initalState,action)=>{
    switch(action.type){

        case types.authLogin:
            return{
                ...state,
                ...action.payload,
                cheking:false,
            }
        case types.authChekingFinish:
            return{
                ...state,
                cheking:false
            }
            case types.authLogout:
        return{
            cheking:false
        }
        default:
            return state
    }

}