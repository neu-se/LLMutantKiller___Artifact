import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should pass on original code and fail on mutated code', () => {
    const read = pull.values([1, 2, 3])
    const s = {
      sink: (read: any) => {
        return function (abort: any, cb: any) {
          read(abort, function (end: any, data: any) {
            if (end) cb(end)
            else cb(null, data)
          })
        }
      }
    }

    expect(() => pull(read, s)).not.toThrow()
  })
})