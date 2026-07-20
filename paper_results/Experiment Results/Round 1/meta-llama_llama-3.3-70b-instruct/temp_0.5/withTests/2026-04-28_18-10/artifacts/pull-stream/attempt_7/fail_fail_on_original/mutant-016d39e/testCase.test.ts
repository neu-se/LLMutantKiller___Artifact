import drain from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should log a warning with a meaningful error message when no done callback is supplied', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const sink = drain(() => {}, undefined)
    expect(consoleSpy).toHaveBeenCalledTimes(1)
    expect(consoleSpy).toHaveBeenCalledWith(expect.objectContaining({ message: 'no done callback supplied' }))
  })
})