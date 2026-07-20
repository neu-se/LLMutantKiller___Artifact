import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from "@jest/globals"

describe('Matcher', () => {
  it('/** should match the root path / via the ^/$ alternative in the regex', () => {
    const matcher = Matcher.for('/**')
    // Original regex: ^\/$|^(?:\/[^/]+)+$  — matches "/" via ^\/$
    // Mutated regex:  ^(?:\/[^/]+)+$        — does NOT match "/" (requires at least one segment)
    expect('/'.match(matcher)).not.toBeNull()
    expect('/foo'.match(matcher)).not.toBeNull()
  })
})