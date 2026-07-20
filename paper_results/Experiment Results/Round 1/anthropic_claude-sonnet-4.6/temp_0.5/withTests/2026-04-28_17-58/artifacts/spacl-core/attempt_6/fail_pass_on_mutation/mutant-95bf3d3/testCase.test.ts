import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from "@jest/globals"

describe('Matcher', () => {
  it('compiles /++ correctly to match root and single-segment paths', () => {
    const matcher = new Matcher('/++')
    expect(matcher.source).toBe('^\\/$|^\\/[^/]+$')
    expect('/'.match(matcher)).not.toBeNull()
    expect('/foo'.match(matcher)).not.toBeNull()
    expect('/foo/bar'.match(matcher)).toBeNull()
  })
})