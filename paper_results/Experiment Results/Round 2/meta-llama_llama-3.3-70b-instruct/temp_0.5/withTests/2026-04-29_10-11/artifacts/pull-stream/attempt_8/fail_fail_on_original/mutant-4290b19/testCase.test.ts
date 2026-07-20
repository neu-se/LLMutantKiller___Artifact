import { pull } from '../pull.js'

describe('pull-stream', () => {
  it('should pass when using the original code and fail when using the mutated code', () => {
    // Test the original code
    const originalPull = pull(
      pull.values([1, 2, 3])
    )

    originalPull(null, (end: boolean | null, data: any) => {
      if (end) {
        // Do nothing
      } else {
        // Do nothing
      }
    })

    expect(() => {
      originalPull(null, (end: boolean | null, data: any) => {
        if (end) {
          // Do nothing
        } else {
          // Do nothing
        }
      })
    }).not.toThrow()

    // Test the mutated code
    const mutatedPull = pull(
      pull.values([1, 2, 3]),
      (read: any) => {
        const args = new Array(4)
        for (let i = 0; i <= 3; i++) {
          args[i] = read
        }
        return (read: any) => pull.apply(null, args)
      }
    )

    expect(() => {
      mutatedPull(null, (end: boolean | null, data: any) => {
        if (end) {
          // Do nothing
        } else {
          // Do nothing
        }
      })
    }).toThrow()
  })
})