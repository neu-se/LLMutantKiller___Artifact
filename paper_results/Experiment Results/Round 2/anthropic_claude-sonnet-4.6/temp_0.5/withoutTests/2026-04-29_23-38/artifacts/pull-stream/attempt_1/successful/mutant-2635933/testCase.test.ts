import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with through stream objects", () => {
  it("should correctly pipe data through a through stream object with sink and source", (done) => {
    // Create a simple source that emits values 1, 2, 3 then ends
    const values = [1, 2, 3]
    let sourceIndex = 0
    
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (sourceIndex >= values.length) return cb(true)
      cb(null, values[sourceIndex++])
    }

    // Create a through stream as an object with sink and source
    // This doubles each value
    let throughRead: Function | null = null
    
    const throughStream = {
      sink: (read: Function) => {
        throughRead = read
      },
      get source() {
        return (end: any, cb: Function) => {
          if (!throughRead) return cb(new Error("not connected"))
          throughRead(end, (err: any, data: any) => {
            if (err) return cb(err)
            cb(null, data * 2)
          })
        }
      }
    }

    const results: number[] = []
    
    // Sink that collects results
    const sink = (read: Function) => {
      const drain = () => {
        read(null, (end: any, data: any) => {
          if (end === true) {
            // Verify results - if through stream worked correctly, values should be doubled
            expect(results).toEqual([2, 4, 6])
            done()
            return
          }
          if (end) {
            done(end)
            return
          }
          results.push(data)
          drain()
        })
      }
      drain()
    }

    // Use pull with a through stream object (not a function)
    pull(source, throughStream, sink)
  })
})