import {
  TaskQueue
} from "./build/queue.js"

const COUNT_OF_TASK = 100
const CONCCURENCY_LIMIT = 10
let Queue = new TaskQueue(CONCCURENCY_LIMIT)
Queue.on('error', console.error)
Queue.on('finished', () => console.log('Finished'))

for (let i = 0; i < COUNT_OF_TASK; i++) {
  Queue.push((cb) => {
    setTimeout(() => {
      return Math.random() < 0.1 ?  cb(`Error in task ${i}`) : cb()
    }, Math.floor(Math.random() * 1000))
  })
}
