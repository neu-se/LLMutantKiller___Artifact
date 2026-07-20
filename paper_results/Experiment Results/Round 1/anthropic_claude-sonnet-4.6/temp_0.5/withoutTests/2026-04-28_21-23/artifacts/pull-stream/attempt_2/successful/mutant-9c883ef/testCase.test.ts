import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js"

describe('find sink', () => {
  it('should treat single function argument as callback and find first item', (done) => {
    // When find is called with only one argument (a function), it should treat
    // that argument as the callback (cb = test, test = id)
    // In the mutated code, if(false) means this branch never executes,
    // so the single function argument would be treated as 'test' instead of 'cb'
    
    // Create a simple pull-stream source that emits values then ends
    const values = [1, 2, 3]
    let i = 0
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (i >= values.length) return cb(true) // stream ended
      cb(null, values[i++])
    }

    // Call find with only one argument (the callback)
    // Original: if(!cb) => cb = test, test = id (callback receives first truthy data)
    // Mutated: if(false) => test = prop(callback) || id (callback used as test, not cb)
    const callback = (err: any, data: any) => {
      expect(err).toBeNull()
      expect(data).toBe(1)
      done()
    }

    const sink = find(callback)
    // sink is a function that takes a read function (source)
    sink(source)
  })
})