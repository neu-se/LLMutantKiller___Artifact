import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull partial application with exactly 2 args where second is a sink-like object', () => {
  it('should return undefined when pipeline ends with a sink object', () => {
    // Create a stateful source
    const makeSource = (values: number[]) => {
      let i = 0
      return (abort: any, cb: Function) => {
        if (abort) return cb(abort)
        if (i >= values.length) return cb(true)
        cb(null, values[i++])
      }
    }

    // A through-stream
    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }

    // A sink-like object (duplex with sink and source)
    const collected: number[] = []
    let sinkRead: Function | null = null
    const sinkObj = {
      sink: (read: Function) => { sinkRead = read },
      source: (abort: any, cb: Function) => {
        if (sinkRead) sinkRead(abort, cb)
      }
    }

    // With exactly 2 args (double, sinkObj), triggers case 2
    // Original: pull(read, ref[0], ref[1]) = pull(source, double, sinkObj)
    //   -> double(source) then sinkObj.sink(doubled), returns sinkObj.source
    // Mutant: pull(read, ref[0], ref[1], ref[2]) = pull(source, double, sinkObj, undefined)
    //   -> same thing since undefined is skipped
    // Both should return sinkObj.source

    const pipeline = pull(double, sinkObj)
    const source = makeSource([3, 4, 5])
    const result = pipeline(source)

    // result should be sinkObj.source (a function)
    expect(typeof result).toBe('function')
    expect(result).toBe(sinkObj.source)
  })
})