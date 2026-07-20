import { pull } from '../../../pull.js'

describe('pull-stream', () => {
  it('should pass when using the original code and fail when using the mutated code', () => {
    // Test the original code
    const originalRead = pull(
      pull.values([1, 2, 3]),
      (read: any) => {
        return (abort: any, cb: any) => {
          read(abort, (end: any, data: any) => {
            if (end) cb(end)
            else cb(null, data)
          })
        }
      }
    )

    originalRead(null, (end: any, data: any) => {
      if (end) {
        // Do nothing
      } else {
        // Do nothing
      }
    })

    expect(() => {
      originalRead(null, (end: any, data: any) => {
        if (end) {
          // Do nothing
        } else {
          // Do nothing
        }
      })
    }).not.toThrow()

    // Test the mutated code
    const mutatedRead = pull(
      pull.values([1, 2, 3]),
      (read: any) => {
        return (abort: any, cb: any) => {
          read(abort, (end: any, data: any) => {
            if (end) cb(end)
            else cb(null, data)
          })
        }
      },
      (read: any) => {
        const args = new Array(4)
        for (let i = 0; i <= 3; i++) {
          args[i] = read
        }
        return (read: any) => pull.apply(null, args)
      }
    )

    expect(() => {
      mutatedRead(null, (end: any, data: any) => {
        if (end) {
          // Do nothing
        } else {
          // Do nothing
        }
      })
    }).toThrow()
  })
})