import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should fail when mutated', () => {
    const read = pull(
      pull.values([1, 2, 3]),
      (read: any) => {
        return function (abort: any, cb: any) {
          read(abort, function (end: any, data: any) {
            if (end) cb(end)
            else if (data === 2) {
              // This should not be called in the mutated version
              cb(null, data)
            } else {
              cb(null, data)
            }
          })
        }
      },
      pull.collect((err: any, ary: any) => {
        throw new Error('This should not be called in the original version')
      })
    )

    expect(() => read(null, (end: any, data: any) => {})).toThrow()
  })
})