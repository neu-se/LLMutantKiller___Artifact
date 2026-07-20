import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('matcher mutation detection', () => {
  it('compiles /++ to a regex that matches "/" in original but not in mutated code', () => {
    const matcher = Matcher.for('/++')
    // Original regex: ^/$|^(?:/[^/]+)?$  — matches '/'
    // Mutated regex:  ^(?:/[^/]+)?$      — does NOT match '/' (only matches '')
    expect(matcher.source).toBe('^/$|^(?:/[^/]+)?$')
  })
})