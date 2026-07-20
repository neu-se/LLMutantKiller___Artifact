import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher optional wildcard behavior', () => {
  it('should match root path "/" with spec containing only optional wildcards', () => {
    const matcher = Matcher.for('/**')
    const result = '/'.match(matcher)
    expect(result).not.toBeNull()
  })
})