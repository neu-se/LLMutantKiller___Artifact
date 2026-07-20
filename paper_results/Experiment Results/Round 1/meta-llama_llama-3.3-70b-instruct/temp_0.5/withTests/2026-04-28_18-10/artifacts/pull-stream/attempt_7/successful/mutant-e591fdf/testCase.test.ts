import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('should not return a function when the first argument is an object', () => {
    const obj = { length: 1 }
    expect(typeof pull(obj)).not.toBe('function')
  })
})