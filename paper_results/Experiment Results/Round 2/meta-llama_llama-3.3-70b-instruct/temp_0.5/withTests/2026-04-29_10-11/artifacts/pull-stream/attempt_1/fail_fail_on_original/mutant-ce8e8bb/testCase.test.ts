import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull function', () => {
  it('should throw an error when a non-function value is passed as an argument', () => {
    expect(() => pull(1, function () {})).toThrowError(TypeError)
  })
})