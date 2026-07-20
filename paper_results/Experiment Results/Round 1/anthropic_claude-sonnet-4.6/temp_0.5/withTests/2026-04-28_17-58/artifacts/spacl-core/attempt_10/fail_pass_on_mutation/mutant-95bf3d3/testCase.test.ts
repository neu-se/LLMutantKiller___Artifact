import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from "@jest/globals"

describe('Matcher', () => {
  it('correctly compiles a spec with only optional wildcards at the end to match root path', () => {
    // A spec with only ++ wildcards (no literals) should match /
    // The opt flag should remain true, producing ^/$|^ prefix
    const m = new Matcher('/++/++/++')
    // Should match / since all segments are optional
    const rootMatch = '/'.match(m)
    expect(rootMatch).not.toBeNull()
    // Should also match paths with 1, 2, or 3 segments
    expect('/a'.match(m)).not.toBeNull()
    expect('/a/b'.match(m)).not.toBeNull()
    expect('/a/b/c'.match(m)).not.toBeNull()
    // Should NOT match paths with 4 segments
    expect('/a/b/c/d'.match(m)).toBeNull()
  })
})