import { pull } from '../../pull.js'

describe('pull-stream', () => {
  it('should pass on original code and fail on mutated code', () => {
    const read = (abort: any, cb: any) => {
      cb(null, 1)
    }

    const s = {
      sink: (read: any) => {
        return function (abort: any, cb: any) {
          read(abort, function (end: any, data: any) {
            if (end) cb(end)
            else cb(null, data)
          })
        }
      },
      source: (read: any) => {
        return function (end: any, cb: any) {
          if (end) cb(end)
          else cb(null, 'test')
        }
      }
    }

    const s2 = {
      sink: (read: any) => {
        return function (abort: any, cb: any) {
          read(abort, function (end: any, data: any) {
            if (end) cb(end)
            else cb(null, data)
          })
        }
      }
    }

    expect(() => pull(read, s, s2)).toThrow()
  })
})