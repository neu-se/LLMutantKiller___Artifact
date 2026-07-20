import { once } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js"

describe('once source abort behavior', () => {
  it('should call the abort callback when aborted with a truthy value', (done) => {
    const onAbortCalled = jest.fn()
    const source = once('someValue', onAbortCalled)

    // First read the value normally
    source(null, (err: any, value: any) => {
      expect(err).toBeNull()
      expect(value).toBe('someValue')

      // Now abort the stream
      const abortError = new Error('abort')
      source(abortError, (err: any) => {
        // The abort callback should have been called
        expect(onAbortCalled).toHaveBeenCalled()
        // The cb should be called with the abort error
        expect(err).toBe(abortError)
        done()
      })
    })
  })
})