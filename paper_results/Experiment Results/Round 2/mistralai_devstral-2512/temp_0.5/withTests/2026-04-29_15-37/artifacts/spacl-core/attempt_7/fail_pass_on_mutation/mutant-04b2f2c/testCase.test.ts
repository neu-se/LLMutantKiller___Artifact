import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it } from '@jest/globals'
import { strictEqual } from 'assert'

describe('Matcher trailing slash handling', () => {
  it('should return null when input ends with slash and length > 1', () => {
    const matcher = Matcher.for('/foo')
    const result = matcher[Symbol.match]('/foo/')
    strictEqual(result, null)
  })
})