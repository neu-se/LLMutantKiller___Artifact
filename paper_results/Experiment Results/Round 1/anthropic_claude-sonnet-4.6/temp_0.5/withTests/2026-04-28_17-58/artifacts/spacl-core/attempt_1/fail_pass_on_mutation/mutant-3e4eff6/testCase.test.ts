import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"
import { describe, it, expect } from "@jest/globals"

describe('Matcher with match-many-or-none wildcard at start', () => {
  it('should match the root path "/" when spec is "/**"', () => {
    const matcher = Matcher.for('/**')
    // The spec /** should match "/" (root path) because ** means zero or more segments
    const result = '/'.match(matcher)
    expect(result).not.toBeNull()
  })
})