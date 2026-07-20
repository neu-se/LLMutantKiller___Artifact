import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should call abort callback with error when err is passed to abort', () => {
    const drainStream = drain(() => {}, () => {})
    const err = new Error('Test error')
    const cb = jest.fn()
    drainStream.abort(err, cb)
    expect(cb).toHaveBeenCalledTimes(1)
    expect(cb).toHaveBeenCalledWith(err)
  })
})