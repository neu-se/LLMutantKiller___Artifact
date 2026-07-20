import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js"

describe('find sink', () => {
  it('should use test as callback when only one argument is provided (no cb)', (done) => {
    // When find is called with only one argument (a function), it should treat
    // that argument as the callback (cb = test, test = id)
    // In the mutated code, if(false) means this branch never executes,
    // so the single function argument would be treated as 'test' instead of 'cb'
    
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      cb(null, 42)
    }

    const callback = (err: any, data: any) => {
      expect(err).toBeNull()
      expect(data).toBe(42)
      done()
    }

    // Call find with only one argument (the callback)
    // Original: if(!cb) => cb = test, test = id (so callback receives data)
    // Mutated: if(false) => test = prop(callback) || id (callback used as test, not cb)
    const sink = find(callback)
    source(null, sink)
  })
})