import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from "@jest/globals"

describe('Matcher', () => {
  it('should compile /** to a regex source that starts with the root alternative', () => {
    const matcher = Matcher.for('/**')
    // Original: opt stays true when min=0, so finalise() produces ^/$|^...
    // Mutated: opt becomes false, so finalise() produces ^... (no ^/$ prefix)
    // Observable difference: the regex source contains '^\\/$|^' in original
    expect(matcher.source.startsWith('^\\/\\$|^') || matcher.source.startsWith('^\\/$|^')).toBe(true)
  })
})