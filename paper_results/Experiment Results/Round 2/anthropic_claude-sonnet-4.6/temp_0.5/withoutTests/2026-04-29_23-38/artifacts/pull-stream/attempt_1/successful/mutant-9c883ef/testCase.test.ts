import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js"

describe('find sink', () => {
  it('should use test as callback when only one argument is provided (no cb)', (done) => {
    // When find is called with only one argument (a function),
    // the original code checks `if(!cb)` and sets cb = test, test = id
    // The mutated code uses `if(false)` which never executes this branch,
    // causing the single argument to be treated as `test` instead of `cb`
    
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      cb(null, 42)
    }

    // Call find with only one argument - the callback
    const sink = find((err: any, data: any) => {
      // This should be called as the callback with the found data
      expect(err).toBeNull()
      expect(data).toBe(42)
      done()
    })

    sink(source)
  })
})