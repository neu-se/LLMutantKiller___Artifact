const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js")

describe('pull partial with 3 through-streams applied to a source with .source property', () => {
  it('should use source.source when available', (done) => {
    const values = [10, 20, 30]
    let i = 0
    const innerSource = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (i >= values.length) return cb(true)
      cb(null, values[i++])
    }
    
    const sourceObj = { source: innerSource }
    
    const partial = pull(
      pull.map((x: number) => x + 1),
      pull.map((x: number) => x * 2),
      pull.map((x: number) => x - 1)
    )
    
    // When partial is called with sourceObj, pull should use sourceObj.source
    // In the original case 3: pull(sourceObj, ref[0], ref[1], ref[2], ref[3])
    //   sourceObj.source is used, ref[3] = undefined is ignored
    // In the mutated default: ref.unshift(sourceObj), pull.apply(null, [sourceObj, a, b, c])
    //   sourceObj.source is used
    // Both should produce the same result
    
    const read = partial(sourceObj)
    
    const results: number[] = []
    const drain = () => {
      read(null, function next(end: any, data: number) {
        if (end === true) {
          expect(results).toEqual([21, 41, 61])
          done()
          return
        }
        if (end) { done(end); return }
        results.push(data)
        read(null, next)
      })
    }
    drain()
  })
})