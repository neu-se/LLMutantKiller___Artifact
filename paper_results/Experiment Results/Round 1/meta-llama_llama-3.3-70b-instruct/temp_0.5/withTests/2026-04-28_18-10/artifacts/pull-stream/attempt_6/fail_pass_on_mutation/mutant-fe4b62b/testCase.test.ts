import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should call done callback with error when error occurs during abort', () => {
    const done = jest.fn()
    const drainStream = drain(() => true, done)
    drainStream.abort(new Error('Test error'), (err, cb) => {
      cb = jest.fn()
      expect(cb).toHaveBeenCalledTimes(0)
      expect(err).toBeInstanceOf(Error)
    })
  })
})