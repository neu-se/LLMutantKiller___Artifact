import { Matcher } from "../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from "@jest/globals"

describe('Matcher', () => {
  it('should match root path "/" with spec "/++" (match-one-or-none)', () => {
    const matcher = new Matcher('/++')
    // /++ should match "/" because ++ is match-one-or-none wildcard
    // In original code: opt stays true when min===0, giving ^/$|^ prefix
    // In mutated code: opt becomes false when min>=0, losing the ^/$|^ prefix
    const result = '/'.match(matcher)
    expect(result).not.toBeNull()
  })
})