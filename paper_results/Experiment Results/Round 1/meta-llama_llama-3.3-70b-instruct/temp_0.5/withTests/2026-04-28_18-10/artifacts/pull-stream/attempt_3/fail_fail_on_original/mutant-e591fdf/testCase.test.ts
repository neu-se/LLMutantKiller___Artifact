import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('should call the function with correct arguments', () => {
    const func = jest.fn()
    pull(func, 1)
    expect(func).toHaveBeenCalledTimes(1)
    expect(func).toHaveBeenCalledWith(1)
  })
})