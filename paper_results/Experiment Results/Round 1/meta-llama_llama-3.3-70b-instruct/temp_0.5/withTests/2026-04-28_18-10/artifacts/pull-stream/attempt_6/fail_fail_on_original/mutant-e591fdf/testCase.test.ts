import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('should check the type and length of the function', () => {
    const func = function(a) {}
    const result = pull(func)
    expect(result).toBeInstanceOf(Function)
    const func2 = function() {}
    const result2 = pull(func2)
    expect(result2).toBeInstanceOf(Function)
    const notFunc = {}
    const result3 = pull(notFunc)
    expect(result3).toBeInstanceOf(Function)
  })
})