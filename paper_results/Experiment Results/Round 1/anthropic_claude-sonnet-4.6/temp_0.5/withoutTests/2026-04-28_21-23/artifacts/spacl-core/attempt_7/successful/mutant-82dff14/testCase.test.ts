import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('should have 1.1 as the default version parameter in the constructor', () => {
    // After TypeScript compilation, the constructor should have '1.1' as default
    // We can verify this through Function.prototype.toString()
    const classSource = Matcher.toString()
    // The constructor default should be '1.1', not ''
    // Check that the pattern 'version = ""' or "version = ''" does NOT appear
    // (which would indicate the mutated default)
    expect(classSource).not.toMatch(/version\s*=\s*["']{2}[^'"]/)
  })
})