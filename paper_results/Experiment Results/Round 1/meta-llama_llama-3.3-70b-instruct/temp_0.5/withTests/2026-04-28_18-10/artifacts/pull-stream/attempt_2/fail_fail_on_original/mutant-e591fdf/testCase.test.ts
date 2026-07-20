import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('should not throw an error when called with a function argument', () => {
    const func = () => {}
    expect(() => pull(func)).not.toThrowError(TypeError)
    expect(typeof pull(func)).toBe('function')
  })
})