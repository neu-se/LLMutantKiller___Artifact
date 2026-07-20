import { pull } from '../pull.js'

describe('pull-stream', () => {
  it('should pass on original code and fail on mutated code', () => {
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

    expect(() => pull(s, s2)).toThrow()
  })
})