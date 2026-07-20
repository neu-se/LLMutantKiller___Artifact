import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from "@jest/globals"

describe('Matcher', () => {
  it('should match "/" with spec "/++" because ++ means zero or one segment', () => {
    const matcher = Matcher.for('/++')
    // Original compiles to: ^/$|^/[^/]+$  — matches "/"
    // Mutated compiles to:  ^/[^/]+$       — does NOT match "/"
    const result = '/'.match(matcher)
    expect(result).not.toBeNull()
  })
})