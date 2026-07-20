const reduce = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js')

describe('reduce without initial value - error propagation', () => {
  it('should call callback with error when source errors immediately and no initial value is provided', (done) => {
    const testError = new Error('source error')

    const errorSource = (_abort: any, cb: (err: any, data?: any) => void) => {
      cb(testError)
    }

    const through = reduce(
      (acc: any, data: any) => data,
      (err: any, _result: any) => {
        expect(err).toBe(testError)
        done()
      }
    )

    through(errorSource)
  })
})