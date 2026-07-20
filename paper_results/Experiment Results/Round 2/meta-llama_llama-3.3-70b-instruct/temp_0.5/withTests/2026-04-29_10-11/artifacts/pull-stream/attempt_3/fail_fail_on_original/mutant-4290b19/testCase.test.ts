import { pull } from '../../../pull.js'

describe('pull-stream', () => {
  it('should pass when using the original code and fail when using the mutated code', () => {
    // Test the original code
    expect(() => {
      const read = pull(
        pull.values([1, 2, 3]),
        (read) => {
          return (abort, cb) => {
            read(abort, (end, data) => {
              if (end) cb(end)
              else cb(null, data)
            })
          }
        }
      )
      read(null, (end, data) => {
        if (end) {
          // Do nothing
        } else {
          // Do nothing
        }
      })
    }).not.toThrow()

    // Test the mutated code
    expect(() => {
      const read = pull(
        pull.values([1, 2, 3]),
        (read) => {
          return (abort, cb) => {
            read(abort, (end, data) => {
              if (end) cb(end)
              else cb(null, data)
            })
          }
        },
        (read) => {
          const args = new Array(4)
          for (let i = 0; i <= 3; i++) {
            args[i] = read
          }
          return (read) => pull.apply(null, args)
        }
      )
      read(null, (end, data) => {
        if (end) {
          // Do nothing
        } else {
          // Do nothing
        }
      })
    }).toThrow()
  })
})