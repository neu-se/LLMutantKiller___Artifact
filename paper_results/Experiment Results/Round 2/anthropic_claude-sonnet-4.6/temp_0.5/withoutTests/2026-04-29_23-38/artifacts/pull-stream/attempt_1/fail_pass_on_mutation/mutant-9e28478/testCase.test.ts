import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with partial sink case 2", () => {
  it("should correctly apply two through streams when creating a partial sink with 2 arguments", () => {
    const results: number[] = []

    // Create a simple source that emits values 1, 2, 3
    const source = (end: any, cb: (end: any, data?: number) => void) => {
      let i = 0
      const values = [1, 2, 3]
      if (end) return cb(end)
      if (i >= values.length) return cb(true)
      // We need a stateful source
      return cb(null, values[i++])
    }

    // Create a stateful source
    let sourceIndex = 0
    const values = [1, 2, 3]
    const statefulSource = (end: any, cb: (end: any, data?: number) => void) => {
      if (end) return cb(end)
      if (sourceIndex >= values.length) return cb(true)
      cb(null, values[sourceIndex++])
    }

    // Through stream that doubles values
    const double = (read: (end: any, cb: (end: any, data?: number) => void) => void) => {
      return (end: any, cb: (end: any, data?: number) => void) => {
        read(end, (end: any, data?: number) => {
          if (end) return cb(end)
          cb(null, data! * 2)
        })
      }
    }

    // Through stream that adds 10
    const addTen = (read: (end: any, cb: (end: any, data?: number) => void) => void) => {
      return (end: any, cb: (end: any, data?: number) => void) => {
        read(end, (end: any, data?: number) => {
          if (end) return cb(end)
          cb(null, data! + 10)
        })
      }
    }

    // Create a partial sink with 2 through streams
    const partialSink = pull(double, addTen)

    // partialSink should be a function that accepts a read (source)
    expect(typeof partialSink).toBe("function")

    // Apply the partial sink to our source
    const resultStream = partialSink(statefulSource)

    // Drain the result stream
    const drain = (stream: any, done: (results: number[]) => void) => {
      const collected: number[] = []
      const next = () => {
        stream(null, (end: any, data?: number) => {
          if (end === true) return done(collected)
          if (end) throw end
          collected.push(data!)
          next()
        })
      }
      next()
    }

    let collectedResults: number[] = []
    let isDone = false

    drain(resultStream, (results) => {
      collectedResults = results
      isDone = true
    })

    // The drain is synchronous in this case since our source/through are synchronous
    expect(isDone).toBe(true)
    // Each value: 1*2+10=12, 2*2+10=14, 3*2+10=16
    expect(collectedResults).toEqual([12, 14, 16])
  })
})