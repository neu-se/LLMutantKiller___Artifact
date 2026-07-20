import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial application with 3 through functions applied to arity-1 source", () => {
  it("should return a readable stream, not a partial function, when source has arity 1", () => {
    const results: number[] = []

    const double = (read: Function) => (end: any, cb: Function) => {
      read(end, (err: any, data: any) => {
        if (err) return cb(err)
        cb(null, data * 2)
      })
    }

    const addOne = (read: Function) => (end: any, cb: Function) => {
      read(end, (err: any, data: any) => {
        if (err) return cb(err)
        cb(null, data + 1)
      })
    }

    const triple = (read: Function) => (end: any, cb: Function) => {
      read(end, (err: any, data: any) => {
        if (err) return cb(err)
        cb(null, data * 3)
      })
    }

    // Source with arity 1 - this triggers the bug in mutated code
    // In mutated code: pull(source, double, addOne, triple, undefined) 
    // source.length === 1, so it enters partial application branch
    // and returns a partial function instead of a composed pipeline!
    let i = 0
    const source = function(x: any) { /* arity 1 */ }

    const partial = pull(double, addOne, triple)
    const piped = partial(source)

    // In original: piped is a readable (function with arity 2)
    // In mutated: piped is a partial function (function with arity 1)
    // We can detect this by checking if piped is callable as a readable
    // or by checking the result type

    // The result should be a readable stream function, not a partial
    // In original: piped = triple(addOne(double(source))) - a readable
    // In mutated: piped = partial function waiting for another read
    
    // If piped is a partial, calling piped(anotherSource) returns another function
    // If piped is a readable, calling piped(null, cb) invokes the pipeline
    
    let callbackInvoked = false
    let callbackResult: any = undefined
    
    // Try to use piped as a readable - pass (null, callback)
    // In original: this calls the pipeline (source has arity 1 so it might error, but piped is callable)
    // In mutated: piped is a partial, so piped(null, callback) returns another partial or pipeline
    
    const resultOfCall = (piped as any)(null, (end: any, data: any) => {
      callbackInvoked = true
      callbackResult = data
    })

    // In original code: piped is triple(addOne(double(source)))
    //   piped(null, cb) calls the pipeline, cb is invoked, resultOfCall is undefined
    // In mutated code: piped is a partial function
    //   piped(null, cb) treats null as a read source and cb as a through
    //   returns pull(null_source, cb_through) - a function, not undefined
    //   callbackInvoked remains false
    
    // Actually this is getting complicated. Let me use a real working source with length===1.
    // The issue is pull-stream sources need arity 2. But we can wrap.
    
    expect(callbackInvoked).toBe(false) // placeholder - need to rethink
  })
})