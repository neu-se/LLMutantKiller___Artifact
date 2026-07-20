import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('matcher mutation detection', () => {
  it('matches "/" with "/++" spec since ++ means zero or one segment', () => {
    const matcher = Matcher.for('/++')
    // Original regex: ^\/$|^\/[^/]+$  — matches '/' via the ^\/$  alternative
    // Mutated regex:  ^\/[^/]+$       — does NOT match '/' (requires at least one segment char)
    const result = '/'.match(matcher)
    expect(result).not.toBeNull()
  })
})