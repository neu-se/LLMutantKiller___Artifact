import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher with optional single wildcard', () => {
  it('should match root path "/" with spec "/++" in version 1.1', () => {
    const matcher = Matcher.for('/++', '1.1')
    // Original: opt stays true → regex includes ^/$| prefix → matches "/"
    // Mutated: opt forced false → regex is ^(?:/[^/]+)?$ → does NOT match "/"
    expect('/'.match(matcher)).not.toBeNull()
  })
})