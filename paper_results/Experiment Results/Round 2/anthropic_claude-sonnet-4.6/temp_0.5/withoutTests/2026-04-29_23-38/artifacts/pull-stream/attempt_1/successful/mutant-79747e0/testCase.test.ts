import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"

describe('drain without done callback - normal stream end', () => {
  it('should not throw when stream ends normally and no done callback is provided', (done) => {
    // Create a simple source that emits one value then ends
    let count = 0
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end) return cb(end, null)
      if (count === 0) {
        count++
        cb(null, 'value1')
      } else {
        cb(true, null) // end of stream
      }
    }

    // The drain without a done callback - should complete without throwing
    // when stream ends normally (end === true)
    let threw = false
    try {
      const sink = drain(null)
      sink(source)
      // If we get here without throwing, the test should pass
      // Use setImmediate to allow async operations to complete
      setImmediate(() => {
        expect(threw).toBe(false)
        done()
      })
    } catch (e) {
      threw = true
      done(e)
    }
  })
})