import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with duplex/through objects", () => {
  it("should correctly connect a through object (with sink and source) in the pipeline", (done) => {
    // Create a simple source that emits values 1, 2, 3 then ends
    const values = [1, 2, 3]
    let sourceIndex = 0
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (sourceIndex >= values.length) return cb(true)
      cb(null, values[sourceIndex++])
    }

    // Create a through object (duplex) that doubles each value
    // It has both sink and source properties as functions
    let throughRead: Function | null = null
    const through = {
      sink: (read: Function) => {
        throughRead = read
      },
      source: (end: any, cb: Function) => {
        if (!throughRead) return cb(new Error("not connected"))
        throughRead(end, (err: any, data: any) => {
          if (err) return cb(err)
          cb(null, data * 2)
        })
      }
    }

    // Collect results
    const results: number[] = []
    const sink = (read: Function) => {
      const next = () => {
        read(null, (err: any, data: any) => {
          if (err === true) {
            // Stream ended
            try {
              expect(results).toEqual([2, 4, 6])
              done()
            } catch (e) {
              done(e)
            }
            return
          }
          if (err) return done(err)
          results.push(data)
          next()
        })
      }
      next()
    }

    // Run the pipeline with the through object
    pull(source, through, sink)
  })
})