import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should pass correct number of arguments when using partial application default case", () => {
    // Track how many times pull is called and with how many args
    const through = (read: Function) => (end: any, cb: Function) => read(end, cb)
    
    // Create 5 through streams (triggers default case: length=5, switch default)
    // When partial(source) is called, it does:
    // ref.unshift(read) -> ref has 6 elements
    // pull.apply(null, ref) -> pull called with 6 args
    // In that call: a=source (length=2, not 1), so goes to non-partial path
    // reads through 5 through streams
    
    const partial = pull(through, through, through, through, through)
    
    let i = 0
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (i++ > 0) return cb(true)
      cb(null, 42)
    }
    
    let result: number | null = null
    const stream = partial(source)
    stream(null, (err: any, data: any) => { if (!err) result = data })
    expect(result).toBe(42)
  })
})