import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should call the abort function when the read function is called with abort', (done) => {
    let called = false
    const read = drain((data) => {
      return true
    }, () => {
      done()
    })

    read(null, (end, data) => {
      read(true, (end, data) => {
        if (end === true) {
          called = true
        }
      })
    })

    setTimeout(() => {
      expect(called).toBe(true)
      done()
    }, 10)
  })
})