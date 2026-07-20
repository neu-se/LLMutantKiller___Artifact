import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"
import { describe, it, expect } from "@jest/globals"

describe('Matcher', () => {
  it('should compile /++ to a regex that matches "/" but not empty string', () => {
    const matcher = Matcher.for('/++')
    // The compiled regex source should contain the ^/$ alternative for matching root
    // Original: ^/$|^(?:/[^/]+)?$  — matches "/" via the ^/$  part
    // Mutated:  ^(?:/[^/]+)?$      — matches "" (empty string) instead of "/"
    expect(matcher.source).toBe('^\\/$|^\\/[^/]+$|^(?:\\/[^/]+)?$'.replace(/x/g,'x'))
    const rootMatch = '/'.match(matcher)
    const emptyMatch = ''.match(matcher)
    expect(rootMatch).not.toBeNull()
    expect(emptyMatch).toBeNull()
  })
})