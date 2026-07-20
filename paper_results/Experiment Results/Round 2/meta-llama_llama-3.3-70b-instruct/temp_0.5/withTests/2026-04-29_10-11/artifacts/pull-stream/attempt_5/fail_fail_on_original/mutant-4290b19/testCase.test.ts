import { pull } from '../pull.js'

describe('pull-stream', () => {
  it('should pass when using the original code and fail when using the mutated code', () => {
    // Test the original code
    const originalRead = pull(
      pull.values([1, 2, 3])
    )

    originalRead(null, (end, data) => {
      if (end) {
        // Do nothing
      } else {
        // Do nothing
      }
    })

    expect(() => {
      originalRead(null, (end, data) => {
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
      (read) => {
        const args = new Array(4)
        for (let i = 0; i <= 3; i++) {
          args[i] = read
        }
        return (read) => pull.apply(null, args)
      }
    )

    expect(() => {
      mutatedRead(null, (end, data) => {
        if (end) {
          // Do nothing
        } else {
          // Do nothing
        }
      })
    }).toThrow()
  })
})