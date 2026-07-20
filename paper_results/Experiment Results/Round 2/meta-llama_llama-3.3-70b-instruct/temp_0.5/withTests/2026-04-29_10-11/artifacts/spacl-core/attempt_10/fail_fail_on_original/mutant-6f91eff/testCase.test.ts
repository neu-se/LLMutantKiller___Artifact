import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'
import { describe, it } from '@jest/globals'
import { strictEqual } from 'assert'

describe('Matcher', () => {
  it('rejects paths with malformed wildcards in version 1.1', () => {
    const spec = '/a*b'
    try {
      new Matcher(spec, '1.1')
    } catch (error) {
      strictEqual(true, true)
    }
    try {
      new Matcher(spec, '1')
      strictEqual(true, false, `Expected Matcher.for('${spec}', '1') to throw an error`)
    } catch (error) {
      strictEqual(true, false, `Did not expect Matcher.for('${spec}', '1') to throw an error`)
    }
  })
})