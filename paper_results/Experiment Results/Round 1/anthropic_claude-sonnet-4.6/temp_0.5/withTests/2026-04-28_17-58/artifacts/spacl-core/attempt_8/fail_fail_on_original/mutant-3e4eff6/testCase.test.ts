import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from "@jest/globals"

describe('Matcher', () => {
  it('/** regex source should differ from //* pattern - must include root alternative', () => {
    const m1 = Matcher.for('/**')
    const m2 = Matcher.for('/++')
    // In original: both have opt=true at final flatten (min=0), so both get ^/$|^ prefix
    // In mutated: opt gets set to false, so prefix becomes just ^
    // The key observable difference: original regex source starts with ^\/$|^
    // while mutated starts with ^ followed directly by the pattern
    expect(m1.source).toBe('^\\/\\$|^(?:\\/[^/]+)*$'.replace('\\$', '$'))
  })
})