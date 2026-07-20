import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('should not throw an error when called with a partial sink', () => {
    const sink = function (read: any) {
      let called = false
      return function (end: any, cb: any) {
        if (called) {
          // do nothing
        } else {
          called = true
          read(end, cb)
        }
      }
    }

    expect(() => {
      pull(sink)
    }).not.toThrow()
  })
})