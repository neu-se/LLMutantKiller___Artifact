import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'
import { describe, it } from '@jest/globals'
import { strictEqual } from 'assert'

describe('Matcher', () => {
  it('accepts paths with valid wildcards in version 1.0', () => {
    const spec = '/a*b'
    try {
      new Matcher(spec, '1.0')
    } catch (error) {
      strictEqual(true, false, `Expected Matcher.for('${spec}', '1.0') not to throw an error`)
    }
    try {
      new Matcher(spec, '1.1')
      strictEqual(true, false, `Expected Matcher.for('${spec}', '1.1') to throw an error`)
    } catch (error) {
      strictEqual(error.message, 'Path contains malformed wildcards')
    }
  })
})