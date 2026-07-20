import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull partial sink', () => {
  it('should throw TypeError with message when partial sink is called a second time', () => {
    const through = function (read: Function) {
      return function (abort: any, cb: Function) {
        read(abort, cb)
      }
    }

    // pull with a single through (length===1) returns a partial sink
    const partialSink = pull(through)

    const makeSource = () => function (abort: any, cb: Function) {
      cb(true)
    }

    // First call consumes args and sets it to null
    partialSink(makeSource())

    // Second call: args is now null, original throws TypeError, mutant silently returns undefined
    let threw = false
    let errorMessage = ''
    try {
      partialSink(makeSource())
    } catch (e: any) {
      threw = true
      errorMessage = e.message
    }

    expect(threw).toBe(true)
    expect(errorMessage).toBe('partial sink should only be called once!')
  })
})