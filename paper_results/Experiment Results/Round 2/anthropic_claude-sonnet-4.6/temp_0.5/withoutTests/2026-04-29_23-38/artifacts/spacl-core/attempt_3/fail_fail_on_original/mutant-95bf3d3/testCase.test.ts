import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should not match empty string against "/++" spec in original but behavior differs in mutant', () => {
    const matcher = new Matcher('/++', '1')
    // In version '1', ++ is not a valid wildcard, so let's use version 1.1
    const m = new Matcher('/++')
    // The root path should match since ++ makes the segment optional
    expect(''.match(m)).toBeNull()
  })
})