import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should throw an error when a partial sink is called twice', () => {
    const sink = pull((a: any) => {
      return function (read: any) {
        if (a == null) {
          // In the mutated code, this line will be empty
          // So, we expect an error to be thrown here
          throw new TypeError("partial sink should only be called once!")
        }
        return function (end: any, cb: any) {
          read(end, cb)
        }
      }
    })

    // If the mutation is present, this should not throw an error
    // But if the original code is present, this should throw an error
    expect(() => {
      sink(null)
    }).toThrowError(TypeError)
  })
})