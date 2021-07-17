import ACTIONS from "../constants/action";

export default interface IAction {
    type: ACTIONS
    payload?: any
}