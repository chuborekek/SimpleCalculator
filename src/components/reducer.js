import { ACTIONS } from "../App";

function reducer(state,{type,payload}){
    console.log("state:",state);
    console.log("currentOperand:",state.currentOperand);
    switch(type){
      case ACTIONS.ADD_DIGIT:
          if(state.overwrite)
          return{
            ...state,
            currentOperand:payload.digit,
            overwrite:false
          }
         
          if(payload.digit==="0" && state.currentOperand==="0") return {...state}
         
          if(payload.digit==="." && state.currentOperand==="null") 
          return {
            ...state, 
            currentOperand: `${payload.digit}`,
          }
         
          if(payload.digit==="." && state.currentOperand?.includes(".")) return {...state}

          return {
            ...state, 
            currentOperand: `${state.currentOperand||""}${payload.digit}`,
          }
      
      case ACTIONS.CLEAR:
          return {}

      case ACTIONS.DELETE_DIGIT:
          if(state.overwrite)
          return{
            ...state,
            currentOperand:null,
            overwrite:false
          }

          if(state.currentOperand==null) return state
    
          if(state.currentOperand.length===1) 
          return {
            ...state,
            currentOperand: null
          }
            return {
              ...state,
              currentOperand: state.currentOperand.slice(0,-1)
            }

      case ACTIONS.CHOOSE_OPERATION:
          if(state.currentOperand==null && state.previousOperand==null) {return {...state}}
         
          if(state.currentOperand==null){
            return{
              ...state,
              operation: payload.operation,
              }
            }
         
            if(state.previousOperand==null){
            return{
            ...state,
            operation: payload.operation,
            previousOperand: state.currentOperand,
            currentOperand:null
            }
          }

          return {
            ...state,
            previousOperand: evaluate(state),
            operation: payload.operation,
            currentOperand:null
          }

        case ACTIONS.EVALUATE:
            if(state.currentOperand==null || state.previousOperand==null || state.operation==null)
            return {...state}
            return {
              ...state,
              overwrite:true,
              previousOperand: null,
              operation: null,
              currentOperand: evaluate(state),
            }

        default:
           return {...state}
    }
  
  }

  function evaluate({ currentOperand, previousOperand, operation }){
    const prev = parseFloat(previousOperand)
    const current = parseFloat(currentOperand)
    if(isNaN(prev) || isNaN(current)) return ""
    
    let computation=""
    switch(operation){
      case "+": computation = prev+current
      break;
      case "-": computation = prev-current
      break;
      case "*": computation = prev*current
      break;
      case "÷": computation = prev/current
      break;
      default:
    }
    return computation.toString();
  }

  export default reducer;