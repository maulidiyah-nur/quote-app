export default interface IAPIResult {
    status: number
    error_message?: string
    [key: string]: any
}