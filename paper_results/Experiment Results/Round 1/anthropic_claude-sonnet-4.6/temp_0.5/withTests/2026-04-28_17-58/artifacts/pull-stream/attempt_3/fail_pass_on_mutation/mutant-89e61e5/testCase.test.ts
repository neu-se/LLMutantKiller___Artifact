import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull partial sink double invocation', () => {
  it('should throw TypeError when a partial sink returned function is called a second time', () => {
    // Create a partial pipeline (starts with a through, so pull returns a function of length 1)
    const partialPipeline = pull(
      function (read: Function) {
        return function (abort: any, cb: Function) {
          read(abort, function (end: any, data: any) {
            if (end) cb(end)
            else cb(null, data)
          })
        }
      }
    )

    // partialPipeline is a function that accepts a read source
    // Call it once with a source
    const source1 = function (abort: any, cb: Function) {
      cb(true)
    }

    // First call should work fine
    partialPipeline(source1)

    // Second call should throw because args was set to null after first call
    const source2 = function (abort: any, cb: Function) {
      cb(true)
    }

    expect(() => {
      partialPipeline(source2)
    }).toThrow(TypeError)
  })
})