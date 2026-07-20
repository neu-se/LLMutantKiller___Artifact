import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should return the source read function unchanged when a null through-stream is passed", () => {
    // In the original code, the else if (s && typeof s === 'object') check
    // guards against null/falsy values - null s is skipped entirely
    // In the mutated code, else if (true) means s.sink(read) is called on null,
    // which throws a TypeError

    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      cb(null, 42)
    }

    // null is falsy, so original code's `s && typeof s === 'object'` is false -> skipped
    // mutated code's `true` means it tries null.sink(read) -> TypeError
    expect(() => {
      pull(source, null as any)
    }).not.toThrow()
  })
})