import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher static constructor default version parameter', () => {
  it('should use version "1.1" as the default when no version is specified', () => {
    const matcher = Matcher.for('/test')
    expect(matcher.spec).toBe('/test')
    expect(() => Matcher.for('/**')).not.toThrow()
  })
})