import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it } from '@jest/globals'
import { strictEqual } from 'assert'

describe('Matcher trailing slash behavior', () => {
  it('should return null for paths ending with slash when length > 1', () => {
    const matcher = Matcher.for('/test/path')
    const result = matcher[Symbol.match]('/test/path/')
    strictEqual(result, null)
  })
})