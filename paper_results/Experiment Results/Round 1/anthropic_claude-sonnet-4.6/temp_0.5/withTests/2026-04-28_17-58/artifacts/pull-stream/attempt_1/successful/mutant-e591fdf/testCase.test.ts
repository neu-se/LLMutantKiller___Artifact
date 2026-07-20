import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull with non-function first argument', () => {
  it('should not treat a non-function argument as a partial pipeline', () => {
    const pull = require('../../../../../../../../../../../subject_repositories/pull-stream/pull.js')
    
    // A string of length 1 - not a function, but has .length === 1
    // Original: typeof 'x' === 'function' is false, so skip partial pipeline
    // Mutated: true && 'x'.length === 1 is true, so enters partial pipeline incorrectly
    expect(() => {
      const result = pull('x')
      // In original: result is 'x' (just returned as read)
      // In mutated: result is a function (partial pipeline)
      expect(typeof result).toBe('string')
    }).not.toThrow()
  })
})