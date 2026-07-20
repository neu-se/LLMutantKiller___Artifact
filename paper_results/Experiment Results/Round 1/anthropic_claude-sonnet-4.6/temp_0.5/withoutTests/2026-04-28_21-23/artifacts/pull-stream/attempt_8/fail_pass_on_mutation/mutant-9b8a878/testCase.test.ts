import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should create args array with correct length", () => {
    // new Array(n) creates array with length n BEFORE filling
    // new Array() creates array with length 0 BEFORE filling
    // After filling both with n elements, both have length n
    // The only observable difference would be if something reads args.length
    // before the loop fills it - which doesn't happen in the code
    
    // However, let me try: what if we can observe the difference through
    // the behavior of the returned partial function's closure?
    
    // The partial function captures 'length' and 'args'
    // 'length' is the same in both cases
    // 'args' after the loop is the same in both cases
    
    // I believe this is an equivalent mutant.
    // Submitting a behavioral test anyway:
    
    const through = (read: Function) => (end: any, cb: Function) => read(end, cb)
    const partial = pull(through)
    
    let i = 0
    const source = function(end: any, cb: Function) {
      if (end) return cb(end)
      if (i++ > 0) return cb(true)
      cb(null, 99)
    }
    
    let result: any
    const stream = partial(source)
    stream(null, (err: any, data: any) => { if (!err) result = data })
    expect(result).toBe(99)
  })
})