import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'
import { describe, it } from '@jest/globals'
import { strictEqual } from 'assert'

describe('Matcher', () => {
  it('rejects paths with trailing slashes', () => {
    const spec = '/foo/'
    try {
      new Matcher(spec)
      strictEqual(true, false, `Expected Matcher.for('${spec}') to throw an error`)
    } catch (error: any) {
      strictEqual(error.message, 'Path must not end with a slash')
    }
  })
})