import * as drainModule from '../../../sinks/drain.js'

describe('drain', () => {
  it('should log a warning message with a meaningful error when no done callback is supplied and an error occurs', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const drain = drainModule.default
    const sink = drain(() => {}, undefined)
    const error = new Error('Test error')
    sink.abort(error)
    expect(consoleSpy).toHaveBeenCalledTimes(1)
    expect(consoleSpy).toHaveBeenCalledWith(expect.objectContaining({ message: expect.stringContaining('no done callback supplied') }))
  })
})