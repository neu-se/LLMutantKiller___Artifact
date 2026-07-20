import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from "@jest/globals"

describe('Matcher', () => {
  it('Matcher.for produces same result as new Matcher for wildcard specs', () => {
    const m1 = Matcher.for('/++')
    const m2 = new Matcher('/++')
    expect(m1.source).toBe(m2.source)
    expect('/'.match(m1)).not.toBeNull()
    expect('/'.match(m2)).not.toBeNull()
    expect('/foo/bar'.match(m1)).toBeNull()
    expect('/foo/bar'.match(m2)).toBeNull()
  })
})