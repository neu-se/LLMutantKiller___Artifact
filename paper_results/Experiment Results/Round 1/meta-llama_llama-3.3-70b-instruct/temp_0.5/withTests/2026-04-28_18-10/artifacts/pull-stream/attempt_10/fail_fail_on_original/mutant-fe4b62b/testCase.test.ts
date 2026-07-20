import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should call done callback with error when error occurs during abort', () => {
    const done = jest.fn()
    const drainStream = drain((data) => {
      if (data === null) return true;
      throw new Error('Test error');
    }, done)
    drainStream(null, () => {})
    expect(done).toHaveBeenCalledTimes(1)
    expect(done).toHaveBeenCalledWith(new Error('Test error'))
  })
})