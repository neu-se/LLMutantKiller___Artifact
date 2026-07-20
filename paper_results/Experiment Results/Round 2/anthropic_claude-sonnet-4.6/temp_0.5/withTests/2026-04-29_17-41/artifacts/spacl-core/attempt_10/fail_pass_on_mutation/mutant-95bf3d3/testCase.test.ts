import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('correctly matches paths for spec with trailing optional wildcard', () => {
    const matcher = new Matcher('/++')
    // With min=1 set in if block, pattern is /[^/]+ not (?:/[^/]+)?
    // So ^/$|^/[^/]+$ - matches / and /foo but NOT empty string
    const result = ''.match(matcher)
    expect(result).toBeNull()
  })
})