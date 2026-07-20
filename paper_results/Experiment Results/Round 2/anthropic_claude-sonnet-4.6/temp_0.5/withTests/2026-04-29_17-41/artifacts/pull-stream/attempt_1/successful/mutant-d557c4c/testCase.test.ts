import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull with non-object non-function argument', () => {
  it('should skip non-object non-function through arguments without throwing', () => {
    // In original: else if (s && typeof s === 'object') - skips numbers
    // In mutated: else if (s && true) - tries to call .sink() on a number, throws
    expect(() => {
      const read = pull(
        function(abort: any, cb: any) { cb(true) }, // simple source that ends immediately
        42 as any // non-object, non-function - original skips, mutant throws
      )
    }).not.toThrow()
  })
})