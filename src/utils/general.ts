export const RandomInt = (min: number, max: number): number => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const GetDate = (add: number) => {
    const res =  new Date(Date.now() + (add * 24*60*60*1000))
    return `${res.toLocaleString('default', { month: 'long' })} ${res.getDate()}`
}
