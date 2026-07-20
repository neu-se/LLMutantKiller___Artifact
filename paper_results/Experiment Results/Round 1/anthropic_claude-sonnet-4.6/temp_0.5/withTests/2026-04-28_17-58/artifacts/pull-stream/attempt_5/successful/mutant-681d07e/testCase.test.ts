import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull partial sink double-call guard', () => {
  it('throws TypeError with correct message on second invocation', () => {
    function through(read: Function) {
      return read
    }

    const partialSink = pull(through)

    const source = function(_abort: any, cb: Function) {
      cb(true)
    }

    // First call succeeds
    partialSink(source)

    // Second call: original throws "partial sink should only be called once!"
    // Mutated code skips the check, then tries ref[0] where ref=null -> TypeError with different message
    // We verify the specific error message to distinguish the two cases
    expect(() => {
      partialSink(source)
    }).toThrow('partial sink should only be called once!')
  })
})