import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with duplex stream object", () => {
  it("should correctly pipe through a duplex stream object with sink and source properties", () => {
    // Create a simple source that produces values 1, 2, 3
    const values = [1, 2, 3]
    let sourceIndex = 0
    
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (sourceIndex >= values.length) return cb(true)
      cb(null, values[sourceIndex++])
    }

    // Create a duplex object (through stream as an object with sink and source)
    const results: number[] = []
    let sinkRead: Function | null = null
    
    // The duplex object transforms values by doubling them
    const duplex = {
      sink: (read: Function) => {
        sinkRead = read
      },
      source: (end: any, cb: Function) => {
        if (end) return cb(end)
        sinkRead!(end, (err: any, val: number) => {
          if (err) return cb(err)
          cb(null, val * 2)
        })
      }
    }

    // Create a sink that collects results
    const sink = (read: Function) => {
      const drain = () => {
        read(null, (end: any, val: number) => {
          if (end) return
          results.push(val)
          drain()
        })
      }
      drain()
    }

    // Use pull with a duplex object - this should work correctly in original
    // but fail in mutated version (where typeof s !== 'object' is used)
    pull(source, duplex, sink)

    // In original code: duplex.sink is called, values are doubled
    // In mutated code: the object branch is skipped, duplex is treated as a function
    // which would fail since duplex is not a function
    expect(results).toEqual([2, 4, 6])
  })
})