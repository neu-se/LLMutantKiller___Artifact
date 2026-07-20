import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull pipeline factory with 2 streams where second is a sink object", () => {
  it("should correctly pipe source through a through stream into a sink object when using pipeline factory with 2 args", (done) => {
    const results: number[] = []

    // Create a through stream (function)
    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }

    // Create a sink object (has .sink and .source)
    let sinkRead: Function | null = null
    const sinkObj = {
      sink: (read: Function) => { sinkRead = read },
      source: (abort: any, cb: Function) => {
        sinkRead!(abort, (end: any, data: any) => {
          if (end) return cb(end)
          results.push(data)
          cb(null, data)
        })
      }
    }

    // pipeline factory with 2 args: a through function and a sink object
    // This triggers case 2 in the switch
    const pipeline = pull(double, sinkObj)

    let idx = 0
    const values = [1, 2, 3]
    const src = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (idx >= values.length) return cb(true)
      cb(null, values[idx++])
    }

    // When pipeline is called with a source, it should connect everything
    // With mutation: falls to case 3, calls pull(read, ref[0], ref[1], ref[2])
    // ref[2] is undefined, s.sink(read) where s is undefined would throw
    const resultRead = pipeline(src)

    // drain the stream
    const drain = () => {
      resultRead(null, (end: any, data: any) => {
        if (end === true) {
          expect(results).toEqual([2, 4, 6])
          done()
          return
        }
        if (end) { done(end); return }
        drain()
      })
    }
    drain()
  })
})