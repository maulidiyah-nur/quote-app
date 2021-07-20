
const ListFile = (dir: string): Array<string> => []
const IsFile = (dir: string): boolean => true
const ReadFile = (dir: string): string => 'a'

export const FlattenFS = (path: string) => {
    let queue: Array<string> = []
    let res: Array<string> = []

    const dir = ListFile(path)
    queue = [...queue, ...dir]
    
    while (queue.length > 0) {
        const current = queue[0]
        const current_content = ListFile(current)
        res = [...res, ...(current_content.filter((c) => IsFile(c)))]
        queue = [...queue, ...(current_content.filter((c) => !IsFile(c)))]

        queue = queue.splice(0, 1)
    }
    return res
}

const FindDuplicate = (path: string) => {
    const flatten = FlattenFS(path)
    const res: {[key: string]: Array<string>} = {}

    flatten.forEach((f) => {
        const file: string = ReadFile(f)
        res[file] = [...res[file], f]
    })

    return Object.values(res)
}

FindDuplicate('./')