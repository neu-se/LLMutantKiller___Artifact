import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should apply through streams in correct order with multiple stages", () => {
    const order: number[] = []
    
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      cb(null, 0)
    }
    
    const makeThrough = (n: number) => (read: Function) => {
      order.push(n)
      return (end: any, cb: Function) => read(end, cb)
    }
    
    // Use 5 through streams to make the off-by-one more likely to matter
    const result = pull(
      source,
      makeThrough(1),
      makeThrough(2),
      makeThrough(3),
      makeThrough(4),
      makeThrough(5)
    )
    
    // All through streams should be applied
    expect(order).toEqual([1, 2, 3, 4, 5])
  })
})