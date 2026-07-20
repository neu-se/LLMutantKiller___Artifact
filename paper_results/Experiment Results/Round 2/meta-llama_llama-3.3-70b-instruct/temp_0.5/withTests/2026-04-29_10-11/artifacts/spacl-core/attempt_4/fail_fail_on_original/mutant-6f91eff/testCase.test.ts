import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'
import { describe, it } from '@jest/globals'
import { strictEqual } from 'assert'

describe('Matcher', () => {
  it('rejects paths with malformed wildcards', () => {
    const spec = '/a*b'
    try {
      new Matcher(spec, '1.1')
      strictEqual(true, false, `Expected Matcher.for('${spec}', '1.1') to throw an error`)
    } catch (error) {
      strictEqual(error.message, 'Path contains malformed wildcards')
    }
    // This should not throw an error in the original code
    new Matcher(spec, '1')
  })
})