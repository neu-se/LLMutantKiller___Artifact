import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('should handle 4 arguments', () => {
    const read = pull(
      (abort: any, cb: any) => {
        if (abort) return cb(abort)
        cb(null, 1)
      },
      (read: any) => {
        return (abort: any, cb: any) => {
          read(abort, (end: any, data: any) => {
            if (end) return cb(end)
            cb(null, data * 2)
          })
        }
      },
      (read: any) => {
        return (abort: any, cb: any) => {
          read(abort, (end: any, data: any) => {
            if (end) return cb(end)
            cb(null, data + 1)
          })
        }
      },
      (read: any) => {
        return (abort: any, cb: any) => {
          read(abort, (end: any, data: any) => {
            if (end) return cb(end)
            cb(null, data * 3)
          })
        }
      }
    )

    let count = 0
    const callback = (end: any, data: any) => {
      if (end) throw new Error('Stream ended unexpectedly')
      count++
      if (count === 4) {
        expect(data).toBe(9)
      }
    }
    read(null, callback)
    read(null, callback)
    read(null, callback)
    read(null, callback)
  })
})