import reduce from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js'

describe('reduce without initial value - error on first read', () => {
  it('should pass the error to callback when source errors immediately', (done) => {
    const testError = new Error('source error')

    // A source that immediately signals an error
    const errorSource = (_abort: any, cb: (end: any, data?: any) => void) => {
      cb(testError)
    }

    // Call reduce with only 2 args (reducer + callback), no initial accumulator
    const throughFn = reduce(
      (acc: any, data: any) => acc + data,
      (err: any, _result: any) => {
        // Original: end !== true (testError !== true), so cb(end) => err === testError
        // Mutated:  end !== true is true, so cb(null) => err === null
        expect(err).toBe(testError)
        done()
      }
    )

    throughFn(errorSource)
  })
})