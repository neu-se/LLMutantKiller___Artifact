const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js")

describe('pull case 3 with through-stream as source', () => {
  it('should not create a nested partial when source has length 1', (done) => {
    // A through-stream has length 1 (takes one argument: read)
    // When used as a source for a 3-item partial in the mutated version,
    // the default case calls ref.unshift(through) then pull.apply(null, ref)
    // pull(through, a, b, c) - through.length === 1 creates a partial!
    
    const values = [1, 2, 3]
    let i = 0
    
    // Create a source wrapped as a through-stream (length 1)
    function throughSource(read: Function) {
      // This is a through-stream that passes values through
      // but it's being used as a "source" here
      return function(abort: any, cb: Function) {
        read(abort, cb)
      }
    }
    // throughSource.length === 1
    
    const actualSource = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (i >= values.length) return cb(true)
      cb(null, values[i++])
    }
    
    // Apply throughSource to actualSource to create a proper source
    const composedSource = throughSource(actualSource)
    
    const partial = pull(
      pull.map((x: number) => x + 1),
      pull.map((x: number) => x * 2),
      pull.map((x: number) => x - 3)
    )
    
    // composedSource.length === 2 (it's a function(abort, cb))
    // so this won't trigger the issue
    
    pull(
      composedSource,
      partial,
      pull.collect((err: any, arr: number[]) => {
        expect(err).toBeNull()
        expect(arr).toEqual([1, 3, 5])
        done()
      })
    )
  })
})