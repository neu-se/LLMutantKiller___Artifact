import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull partial sink', () => {
  it('throws TypeError when partial sink is called a second time', () => {
    // A through-stream has length === 1 (takes a read function)
    // When pull() receives only through-streams, it returns a partial sink
    const through = (read: Function) => read

    // This creates a partial sink because `through` has length === 1
    const partialSink = pull(through)

    // Verify it is indeed a function (partial sink)
    expect(typeof partialSink).toBe('function')

    const source = (_abort: any, cb: Function) => {
      cb(true)
    }

    // First call: args gets set to null after the check passes
    partialSink(source)

    // Second call: in original code, args == null so TypeError is thrown
    // In mutated code, if (false) means the check is skipped, no error thrown
    expect(() => {
      partialSink(source)
    }).toThrow(TypeError)
  })
})