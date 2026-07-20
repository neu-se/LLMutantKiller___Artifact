const reduce = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js')

describe('reduce without initial value on empty stream', () => {
  it('should call callback with only one argument (null) when source is empty and no initial value provided', (done) => {
    // Empty source - ends immediately with true
    const emptySource = (_abort: any, cb: (end: any, data?: any) => void) => {
      cb(true)
    }

    reduce(
      (acc: any, data: any) => acc + data,
      (...args: any[]) => {
        // Original: cb(null) called with 1 argument
        // Mutated: cb(null, undefined) called with 2 arguments
        expect(args.length).toBe(1)
        expect(args[0]).toBeNull()
        done()
      }
    )(emptySource)
  })
})