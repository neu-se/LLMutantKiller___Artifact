import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('should throw an error when called with a non-function argument and no length check', () => {
    const obj = {}
    expect(() => pull(obj)).toThrowError(TypeError)
  })
})