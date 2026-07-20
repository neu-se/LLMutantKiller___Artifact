import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it } from '@jest/globals'
import { strictEqual } from 'assert'

describe('Matcher trailing slash handling', () => {
  it('should return null when matching a path ending with a trailing slash', () => {
    const matcher = Matcher.for('/foo')
    const result = '/foo/'.match(matcher)
    strictEqual(result, null)
  })
})