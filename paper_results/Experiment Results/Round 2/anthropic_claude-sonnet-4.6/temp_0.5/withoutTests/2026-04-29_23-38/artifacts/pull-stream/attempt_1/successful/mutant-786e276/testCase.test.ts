import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with source object", () => {
  it("should unwrap source property when read has a source function", () => {
    // Create a through stream object with a source property (function)
    const values = [1, 2, 3]
    let index = 0

    const sourceRead = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (index >= values.length) return cb(true)
      cb(null, values[index++])
    }

    // Create an object with a source property that is a function
    const throughObj = {
      source: sourceRead
    }

    // When pull receives an object with a source function as the first argument,
    // it should unwrap it (use read.source instead of read)
    const result: any[] = []
    
    pull(
      throughObj,
      (read: Function) => {
        // This is a sink - collect all values
        const drain = () => {
          read(null, (end: any, data: any) => {
            if (end) return
            result.push(data)
            drain()
          })
        }
        drain()
      }
    )

    // In original code: read.source is a function, so it unwraps to sourceRead
    // and the sink receives the actual source reader
    // In mutated code: typeof read.source === "" is always false,
    // so it never unwraps, and the sink receives the throughObj instead of sourceRead
    // which means the sink tries to call throughObj as a function and fails
    expect(result).toEqual([1, 2, 3])
  })
})