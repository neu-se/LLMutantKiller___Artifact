import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should treat :ab as a capture with prop name ab', () => {
    // With mutated code /:./ only matches one char after colon
    // but since match() is substring search, :ab still matches /:./ at position :a
    // So this should be equivalent... unless there's a specific edge case
    // Let's try a capture name that is exactly the string ':'  - not possible due to validation
    // Try path with capture where name has special meaning
    const matcher = new Matcher('/:id/details')
    expect(matcher.props).toEqual(['id'])
    // Verify it matches correctly
    expect('/123/details'.match(matcher)).not.toBeNull()
    expect('/abc/details'.match(matcher)).not.toBeNull()
    // Verify non-matching
    expect('/123/other'.match(matcher)).toBeNull()
    expect('/123'.match(matcher)).toBeNull()
  })
})