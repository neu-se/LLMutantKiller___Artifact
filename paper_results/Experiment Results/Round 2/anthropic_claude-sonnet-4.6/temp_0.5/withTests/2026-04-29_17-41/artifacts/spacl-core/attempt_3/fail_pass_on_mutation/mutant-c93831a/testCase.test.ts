import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"
import { describe, it, expect } from "@jest/globals"

describe('Matcher', () => {
  it('guard prevents trailing slash paths from matching even when regex might match', () => {
    // The spec /++ compiles to ^\/$|^\/[^/]+$
    // The string /foo/ - without guard, regex returns null anyway
    // But for spec / (root), regex is ^/$ which matches /
    // We need a case where trailing slash string matches the regex
    // 
    // Actually, let me try: spec /** and string /
    // / has length 1, guard doesn't apply
    // Both versions: super[Symbol.match]('/') matches ^\/$
    const matcher = Matcher.for('/**')
    expect('/'.match(matcher)).not.toBeNull() // / matches (length 1, no guard)
    expect('/foo/'.match(matcher)).toBeNull() // /foo/ should not match
  })
})