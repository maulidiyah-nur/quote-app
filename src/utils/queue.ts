export class Queue {
    data: Array<string>

    constructor(size: number) {
        this.data = Array(size)
    }

    Enqueue = (a: string) => {
        this.data.push(a)
    }

    Dequeue = () => {
        return this.data.splice(0, 1)[0]
    }

    Size = () => this.data.length

    isEmpty = () => this.Size() === 0
}

export class CircularQueue extends Queue {
    head: number
    tail: number
    size: number

    constructor(size: number) {
        super(size)
        this.size = size
        this.head = 0
        this.tail = 0
    }

    isFull = () => {
        return this.size === this.Size()
    }

    isEmpty = () => this.head === this.tail

    Enqueue = (a: string) => {
        if (!this.isFull()) {
            this.data[this.tail] = a
            this.tail = this.tail === this.size - 1 ? 0 : this.tail += 1
        }
    }

    Dequeue = () => {
        if (!this.isEmpty()) {
            const d = this.data[this.head]
            delete this.data[this.head]
            this.head = this.head === this.size - 1 ? 0 : this.head += 1
            return d
        }
        return ''
    }
}

