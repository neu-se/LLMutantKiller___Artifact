import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should throw an error when a partial sink is called twice', () => {
    const partialSink = pull((a: any) => {
      return function (read: any) {
        if (a == null) {
          throw new TypeError("partial sink should only be called once!")
        }
        return function (end: any, cb: any) {
          read(end, cb)
        }
      }
    })

    const stream = partialSink(1)

    expect(() => {
      partialSink(1)
    }).toThrowError(TypeError)
  })
})