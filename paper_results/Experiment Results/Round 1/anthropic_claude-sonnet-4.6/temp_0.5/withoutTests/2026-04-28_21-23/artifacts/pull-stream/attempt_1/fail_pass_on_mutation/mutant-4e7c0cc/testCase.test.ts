import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with 3 through streams (case 4 in partial application)", () => {
  it("should correctly pipe through 3 transforms when using partial application", () => {
    // Create a partial sink with 3 through functions
    const double = (read: Function) => (end: any, cb: Function) => {
      read(end, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }

    const addOne = (read: Function) => (end: any, cb: Function) => {
      read(end, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + 1)
      })
    }

    const triple = (read: Function) => (end: any, cb: Function) => {
      read(end, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 3)
      })
    }

    // Create a source that emits values 1, 2, 3
    let i = 0
    const values = [1, 2, 3]
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (i >= values.length) return cb(true)
      cb(null, values[i++])
    }

    // Use partial application with 3 through functions (length === 3 in the partial)
    // This triggers case 3 in the switch, which calls pull(read, ref[0], ref[1], ref[2])
    // The mutation breaks case 3 (removing the return statement), making it fall through to case 4
    // which is also broken (empty case 4), so it falls to default
    const partialPipeline = pull(double, addOne, triple)

    const results: number[] = []
    const sink = (read: Function) => {
      const drain = () => {
        read(null, (end: any, data: any) => {
          if (end) return
          results.push(data)
          drain()
        })
      }
      drain()
    }

    // Apply the partial pipeline to the source, then connect to sink
    const piped = partialPipeline(source)
    sink(piped)

    // Each value goes through: double -> addOne -> triple
    // 1 -> 2 -> 3 -> 9
    // 2 -> 4 -> 5 -> 15
    // 3 -> 6 -> 7 -> 21
    expect(results).toEqual([9, 15, 21])
  })
})