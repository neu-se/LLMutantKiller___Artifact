const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js")

describe('pull case 3 with source having .source property', () => {
  it('should use source.source when source has .source property', (done) => {
    const values = [1, 2, 3]
    let i = 0
    const innerRead = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (i >= values.length) return cb(true)
      cb(null, values[i++])
    }
    
    const sourceWithSource = {
      source: innerRead
    }
    
    const partial = pull(
      pull.map((x: number) => x + 1),
      pull.map((x: number) => x * 2),
      pull.map((x: number) => x - 3)
    )
    
    // When partial is called with sourceWithSource, pull.js should use sourceWithSource.source
    const read = partial(sourceWithSource)
    
    const results: number[] = []
    const drain = (abort: any, cb: Function) => {
      read(null, function next(end: any, data: number) {
        if (end === true) { cb(null, results); return }
        if (end) { cb(end); return }
        results.push(data)
        read(null, next)
      })
    }
    
    drain(null, (err: any, arr: number[]) => {
      expect(err).toBeNull()
      expect(arr).toEqual([1, 3, 5])
      done()
    })
  })
})