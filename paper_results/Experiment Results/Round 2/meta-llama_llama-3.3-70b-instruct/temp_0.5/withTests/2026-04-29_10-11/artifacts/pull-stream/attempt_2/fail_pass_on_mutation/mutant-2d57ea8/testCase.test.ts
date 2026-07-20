import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should throw an error with a message when called twice', () => {
    const stream = pull(
      (read: any) => read,
      (read: any) => read
    )

    const read = (end: any, cb: any) => cb(null, 'data')

    stream(read)

    expect(() => {
      stream(read)
    }).toThrowError()
  })
})