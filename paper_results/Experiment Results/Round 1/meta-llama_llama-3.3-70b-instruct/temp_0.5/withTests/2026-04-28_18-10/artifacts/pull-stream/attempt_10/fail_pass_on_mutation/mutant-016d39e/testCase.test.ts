import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should throw an error when no done callback is supplied and an error occurs', () => {
    const sink = drain(() => {}, undefined)
    const error = new Error('Test error')
    expect(() => {
      sink.abort(error)
      throw error
    }).toThrowError('Test error')
  })
})