import once from "../../../../../../../../../../../subject_repositories/pull-stream/sources/once.js"

describe('once source abort behavior', () => {
  it('should invoke the onAbort callback and call cb with abort error when aborted', (done) => {
    const onAbortCalled = jest.fn()
    const abortError = new Error('abort')
    const source = once('someValue', onAbortCalled)

    // Abort immediately without reading
    source(abortError, (err: any) => {
      expect(onAbortCalled).toHaveBeenCalled()
      expect(err).toBe(abortError)
      done()
    })
  })
})