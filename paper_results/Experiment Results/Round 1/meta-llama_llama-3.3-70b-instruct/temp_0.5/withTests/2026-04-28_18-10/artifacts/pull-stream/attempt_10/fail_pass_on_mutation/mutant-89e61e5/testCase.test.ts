import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should throw an error when a partial sink is called twice', () => {
    const f = pull(function (a: any) {
      return function (read: any) {
        if (a == null) {
          throw new TypeError("partial sink should only be called once!")
        }
        return function (end: any, cb: any) {
          read(end, cb)
        }
      }
    })

    try {
      f(null)
    } catch (e) {
      // If the original code is present, this should throw an error
    }

    // If the mutation is present, this should not throw an error
    // But we expect it to throw an error, so we fail the test
    expect(() => {
      f(null)
    }).toThrowError()
  })
})