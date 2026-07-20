import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher optional segment regex', () => {
  it('spec "/++" should generate regex with root path alternative', () => {
    const matcher = Matcher.for('/++', '1.1')
    // Original: opt=true → regex source contains '\/$|' (escaped slash)
    // Mutated: opt=false → regex source does NOT contain that alternative
    expect(matcher.source).toMatch(/\\\/$\|/)
  })
})