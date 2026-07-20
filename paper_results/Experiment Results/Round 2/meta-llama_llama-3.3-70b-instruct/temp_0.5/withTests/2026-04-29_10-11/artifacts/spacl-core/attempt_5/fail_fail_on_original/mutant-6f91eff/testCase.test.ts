import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'
import { describe, it } from '@jest/globals'
import { strictEqual } from 'assert'

describe('Matcher', () => {
  it('accepts paths with valid wildcards', () => {
    const spec = '/a*b'
    try {
      new Matcher(spec, '1.0')
    } catch (error) {
      strictEqual(true, false, `Did not expect Matcher.for('${spec}', '1.0') to throw an error`)
    }
  })
})