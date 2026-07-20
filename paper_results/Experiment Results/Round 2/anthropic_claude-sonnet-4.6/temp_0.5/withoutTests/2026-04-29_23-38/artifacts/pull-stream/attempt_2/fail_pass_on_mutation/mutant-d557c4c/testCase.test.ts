import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with function through-stream", () => {
  it("should not call .sink on a plain function through-stream", () => {
    const values = [1, 2, 3]
    let i = 0

    function source(end: any, cb: Function) {
      if (end || i >= values.length) return cb(true)
      cb(null, values[i++])
    }

    // A plain function through-stream with no .sink or .source
    function double(read: Function) {
      return function(end: any, cb: Function) {
        read(end, function(end: any, data: any) {
          if (end) return cb(end)
          cb(null, data * 2)
        })
      }
    }

    // In the mutated code, after read = double(read), it tries double.sink(read)
    // double.sink is undefined, so this throws TypeError
    // In the original code, since double is a function (not object), the else-if is skipped
    expect(() => {
      pull(source, double)
    }).not.toThrow()
  })
})