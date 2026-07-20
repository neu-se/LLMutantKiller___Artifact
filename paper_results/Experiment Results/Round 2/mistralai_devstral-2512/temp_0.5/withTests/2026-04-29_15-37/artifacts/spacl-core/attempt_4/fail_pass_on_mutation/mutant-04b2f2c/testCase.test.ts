import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it } from '@jest/globals'
import { strictEqual } from 'assert'

describe('Matcher trailing slash behavior', () => {
  it('should not match paths with trailing slashes when length > 1', () => {
    const matcher = Matcher.for('/test')
    const result = '/test/'.match(matcher)
    strictEqual(result, null)
  })
})