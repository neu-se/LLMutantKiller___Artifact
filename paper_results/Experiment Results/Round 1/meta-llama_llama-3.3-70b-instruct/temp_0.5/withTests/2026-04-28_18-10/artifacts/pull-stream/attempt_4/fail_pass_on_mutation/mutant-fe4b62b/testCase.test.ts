import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should call done callback with error when error occurs during abort', () => {
    const done = jest.fn()
    const drainStream = drain(() => true, done)
    drainStream.abort(new Error('Test error'), (err) => {
      expect(err).toBe(true)
    })
  })
})