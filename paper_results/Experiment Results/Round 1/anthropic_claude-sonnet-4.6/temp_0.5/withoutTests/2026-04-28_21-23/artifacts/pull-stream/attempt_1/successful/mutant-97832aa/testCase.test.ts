import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with null argument", () => {
  it("should handle null arguments gracefully without throwing", () => {
    // Create a simple source that produces values
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      cb(null, 1)
    }

    // In the original code, null is not treated as an object sink
    // In the mutated code (|| instead of &&), typeof null === 'object' is true,
    // so null || true = true, causing it to try s.sink(read) on null, throwing TypeError
    expect(() => {
      const result = pull(source, null as any)
    }).not.toThrow()
  })
})