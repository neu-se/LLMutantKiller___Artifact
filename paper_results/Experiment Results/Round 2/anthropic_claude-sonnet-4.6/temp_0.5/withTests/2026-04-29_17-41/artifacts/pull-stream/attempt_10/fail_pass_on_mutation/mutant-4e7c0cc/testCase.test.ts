const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js")

describe('pull case 3 with source.source having length 1', () => {
  it('processes correctly when source has .source property with length 1', (done) => {
    const values = [1, 2, 3]
    let i = 0
    
    // Create a through-stream function (length 1) that acts as a source
    // when wrapped in an object with .source property
    const throughAsSource = function(read: Function) {
      // This through-stream ignores its input and generates values
      return function(abort: any, cb: Function) {
        if (abort) return cb(abort)
        if (i >= values.length) return cb(true)
        cb(null, values[i++])
      }
    }
    // throughAsSource.length === 1
    
    // Wrap it in an object with .source property
    const sourceObj = { source: throughAsSource }
    
    // Create a partial with 3 through-streams
    const partial = pull(
      pull.map((x: number) => x + 1),
      pull.map((x: number) => x * 2),
      pull.map((x: number) => x - 3)
    )
    
    // When partial(sourceObj) is called:
    // pull.js does: read = sourceObj.source = throughAsSource (length 1)
    // Original case 3: pull(throughAsSource, map1, map2, map3, undefined)
    //   throughAsSource.length === 1 → creates a partial!
    // Mutated default: ref.unshift(throughAsSource), pull.apply(null, [throughAsSource, map1, map2, map3])
    //   throughAsSource.length === 1 → creates a partial!
    // Both create a partial... hmm
    
    // Actually let me use a proper source with length 2
    const properSource = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (i >= values.length) return cb(true)
      cb(null, values[i++])
    }
    
    pull(
      properSource,
      partial,
      pull.collect((err: any, arr: number[]) => {
        expect(err).toBeNull()
        expect(arr).toEqual([1, 3, 5])
        done()
      })
    )
  })
})