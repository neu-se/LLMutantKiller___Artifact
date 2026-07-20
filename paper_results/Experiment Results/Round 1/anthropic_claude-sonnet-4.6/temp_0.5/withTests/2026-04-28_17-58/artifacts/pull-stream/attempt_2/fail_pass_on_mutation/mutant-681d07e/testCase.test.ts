import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull stream partial sink double-call protection', () => {
  it('should throw TypeError when a partial sink (partial pipeline) is called twice', () => {
    // Create a partial pipeline (starts with a through-stream, so first arg has length === 1)
    const mapThrough = (fn: (x: number) => number) => (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, fn(data))
      })
    }

    // pull() with only through-streams returns a partial sink (a function with length === 1)
    const partialSink = pull(
      mapThrough((x: number) => x * 2)
    )

    const source = (abort: any, cb: Function) => {
      cb(true) // immediately end
    }

    // First call should succeed
    partialSink(source)

    // Second call should throw TypeError in original code (args == null check)
    // In mutated code (if (false)), the check never triggers and no error is thrown
    expect(() => {
      partialSink(source)
    }).toThrow(TypeError)
  })
})