import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull case 3 mutation detection", () => {
  it("should not throw or return undefined when using partial application with 3 through streams", () => {
    const through = (read: Function) => (end: any, cb: Function) => {
      read(end, cb)
    }

    // Partial application with exactly 3 functions triggers case 3 (length === 3)
    const pipeline = pull(through, through, through)

    let index = 0
    const values = [42]
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (index >= values.length) return cb(true)
      cb(null, values[index++])
    }

    // In mutated code, case 3 falls through to case 4:
    // pull(read, ref[0], ref[1], ref[2], ref[3]) where ref[3] is undefined
    // This causes the loop to process undefined as a stream, which will throw
    expect(() => {
      const result = pipeline(source)
      // Force evaluation by reading a value
      result(null, (end: any, data: any) => {})
    }).not.toThrow()
  })
})