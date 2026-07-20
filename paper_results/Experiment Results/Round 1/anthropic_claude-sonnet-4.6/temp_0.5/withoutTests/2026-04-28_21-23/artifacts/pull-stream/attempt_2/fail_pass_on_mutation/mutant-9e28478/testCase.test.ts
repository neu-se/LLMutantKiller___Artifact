import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with partial sink of length 2", () => {
  it("should correctly pipe through two through streams when using partial sink with 2 arguments", () => {
    // Create a simple synchronous source
    function makeSource(values: number[]) {
      let idx = 0
      return function(end: any, cb: Function) {
        if (end) return cb(end)
        if (idx >= values.length) return cb(true)
        cb(null, values[idx++])
      }
    }

    // Through stream that doubles values
    function double(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end)
          cb(null, data * 2)
        })
      }
    }

    // Through stream that adds 10
    function addTen(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end)
          cb(null, data + 10)
        })
      }
    }

    // Use pull with a source and two through streams directly (case 2 in the switch)
    // pull(source, through1, through2) should trigger case 2 when called via partial sink
    const partialSink = pull(double, addTen)

    // partialSink should be a function
    expect(typeof partialSink).toBe("function")

    // Apply partial sink to source - this is the key operation that uses case 2
    const source = makeSource([1, 2, 3])
    const result = partialSink(source)

    // result should be a readable function
    expect(typeof result).toBe("function")

    // Collect all values synchronously
    const collected: number[] = []
    let done = false

    function readAll() {
      result(null, function next(end: any, data: any) {
        if (end === true) {
          done = true
          return
        }
        if (end) throw end
        collected.push(data)
        result(null, next)
      })
    }

    readAll()

    expect(done).toBe(true)
    // double(1)=2, addTen(2)=12
    // double(2)=4, addTen(4)=14
    // double(3)=6, addTen(6)=16
    expect(collected).toEqual([12, 14, 16])
  })
})