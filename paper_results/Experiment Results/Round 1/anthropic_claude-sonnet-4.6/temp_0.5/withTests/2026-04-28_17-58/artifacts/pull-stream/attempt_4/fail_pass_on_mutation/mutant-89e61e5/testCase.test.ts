import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull partial sink double invocation', () => {
  it('should throw TypeError when the partial pipeline is connected to a source twice', () => {
    // Build a partial pipeline with multiple throughs so pull returns a writable function
    const through1 = function (read: Function) {
      return function (abort: any, cb: Function) {
        read(abort, cb)
      }
    }

    const through2 = function (read: Function) {
      return function (abort: any, cb: Function) {
        read(abort, cb)
      }
    }

    // This creates a partial pipeline (a function with length === 1)
    const partial = pull(through1, through2)

    expect(typeof partial).toBe('function')
    expect(partial.length).toBe(1)

    const makeSource = () => {
      return function (abort: any, cb: Function) {
        cb(true)
      }
    }

    // First call sets args to null internally
    partial(makeSource())

    // Second call should throw TypeError because args is now null
    expect(() => {
      partial(makeSource())
    }).toThrow(TypeError)
  })
})