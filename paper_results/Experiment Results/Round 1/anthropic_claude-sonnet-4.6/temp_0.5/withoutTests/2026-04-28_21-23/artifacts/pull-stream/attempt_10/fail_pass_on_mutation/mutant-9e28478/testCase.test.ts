import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("partial sink with 2 args: second call should throw", () => {
    function makeSource(vals: number[]) {
      let i = 0
      return function(end: any, cb: Function) {
        if (end) return cb(end)
        if (i >= vals.length) return cb(true)
        cb(null, vals[i++])
      }
    }

    function double(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end)
          cb(null, data * 2)
        })
      }
    }

    function addOne(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end)
          cb(null, data + 1)
        })
      }
    }

    const partialSink = pull(double, addOne)

    // First call should work
    const result = partialSink(makeSource([1, 2, 3]))
    expect(typeof result).toBe('function')

    // Second call should throw "partial sink should only be called once!"
    expect(() => partialSink(makeSource([4, 5, 6]))).toThrow(
      "partial sink should only be called once!"
    )
  })
})