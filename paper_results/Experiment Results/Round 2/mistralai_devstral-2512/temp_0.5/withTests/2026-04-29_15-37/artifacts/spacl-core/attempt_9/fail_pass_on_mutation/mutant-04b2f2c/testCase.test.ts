import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it } from '@jest/globals'
import { strictEqual } from 'assert'

describe('Matcher trailing slash handling', () => {
  it('should return null when matching path with trailing slash', () => {
    const matcher = Matcher.for('/foo')
    const testPath = '/foo/'
    const result = testPath.match(matcher)
    strictEqual(result, null, 'Expected null for path with trailing slash')
  })
})