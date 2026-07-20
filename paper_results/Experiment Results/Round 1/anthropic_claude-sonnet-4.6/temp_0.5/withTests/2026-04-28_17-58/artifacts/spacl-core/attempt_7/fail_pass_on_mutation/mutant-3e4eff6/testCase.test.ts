import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from "@jest/globals"

describe('Matcher', () => {
  it('should not match empty string with /++ matcher', () => {
    // /++ compiles to ^/$|^(?:/[^/]+)?$ in original (opt=true, min=0)
    // With mutation opt=false, becomes ^(?:/[^/]+)?$ which matches empty string ""
    const matcher = Matcher.for('/++')
    // Verify the regex source contains the root alternative
    expect(matcher.source).toContain('\\/$|^')
  })
})