import { EventEmitter } from 'events'

export class TaskQueue extends EventEmitter {

  limit: number
  running: number
  queue: Array<Function>

  constructor(limit: number) {
    super()
    this.limit = limit
    this.running = 0
    this.queue = []
  }

  push(task: Function) {
    this.queue.push(task)
    this.next()
    return this
  }

  next() {
    if (this.running === 0 && this.queue.length === 0) {
      return this.emit('finished')
    }

    while (this.running < this.limit && this.queue.length) {
      const task = this.queue.shift()
      task && task((err: string) => {

        if (err) {
          this.emit('error', err)
        }

        this.running--
        this.next()
      })
      this.running++
    }
  }
}
