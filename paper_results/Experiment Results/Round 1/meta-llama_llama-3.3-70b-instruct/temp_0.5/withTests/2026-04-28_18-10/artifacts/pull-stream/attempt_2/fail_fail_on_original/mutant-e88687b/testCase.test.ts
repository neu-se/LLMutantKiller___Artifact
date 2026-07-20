import { drain } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should handle function as error correctly', () => {
    const err = new Error('test error')
    const cb = jest.fn()
    const sink = drain(() => {}, cb)
    sink(err, cb)
    expect(cb).toHaveBeenCalledTimes(1)
    expect(cb).toHaveBeenCalledWith(err)
  })
})