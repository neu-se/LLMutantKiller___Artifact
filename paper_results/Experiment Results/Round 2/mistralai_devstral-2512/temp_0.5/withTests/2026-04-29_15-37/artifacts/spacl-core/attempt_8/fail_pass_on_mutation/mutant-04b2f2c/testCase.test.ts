import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it } from '@jest/globals'
import { strictEqual } from 'assert'

describe('Matcher trailing slash rejection', () => {
  it('should explicitly return null for trailing slash paths', () => {
    const matcher = Matcher.for('/test')
    const result = matcher[Symbol.match]('/test/')
    strictEqual(result, null)
  })
})