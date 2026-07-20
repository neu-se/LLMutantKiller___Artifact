import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('should not create a new function when the first argument is not a function', () => {
    const obj = {}
    expect(typeof pull(obj)).not.toBe('function')
  })
})