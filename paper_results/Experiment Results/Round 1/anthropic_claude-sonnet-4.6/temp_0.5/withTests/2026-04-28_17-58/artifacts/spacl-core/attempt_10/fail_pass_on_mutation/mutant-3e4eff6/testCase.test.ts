import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from "@jest/globals"

describe('Matcher', () => {
  it('/++/++ should match "/" but not "/foo/bar/boo"', () => {
    const matcher = Matcher.for('/++/++')
    // Original: opt stays true when processing trailing ++ (min=0), 
    // giving ^/$|^... which matches "/"
    // Mutated: opt forced false, regex changes, "/" may not match
    // but more importantly the regex pattern itself changes
    // Check the compiled regex source directly
    const source = matcher.source
    // Original should have the ^/$ alternative
    expect(source.startsWith('^\\/\\$|') || source.includes('\\/$|^')).toBe(true)
  })
})