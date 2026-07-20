import once from "../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js"

describe('once source abort behavior', () => {
  it('should call cb with the abort error (not just true) when aborted after value is consumed', (done) => {
    const abortError = new Error('intentional abort')
    const source = once('someValue')

    // First, consume the value
    source(null, (err: any, value: any) => {
      expect(err).toBeNull()
      expect(value).toBe('someValue')

      // Now abort - with original code, cb is called with abortError
      // With mutated code (if(false)), abort branch is skipped, cb(true) is called instead
      source(abortError, (err: any) => {
        expect(err).toBe(abortError)
        done()
      })
    })
  })
})