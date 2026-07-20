import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher wildcard validation for version 1.0', () => {
  it('should accept a valid path with no wildcards in version 1.0 without throwing', () => {
    // In the original code, version '1.0' uses /[*+][^/]|[^/][*+]/ which only matches
    // malformed wildcards. A plain path like /foo should pass validation.
    // In the mutated code, version '1.0' uses /[^*+][^/]|[^/][*+]/ which matches
    // any non-wildcard character followed by a non-slash (like 'fo' in 'foo'),
    // causing valid paths to incorrectly throw "Path contains malformed wildcards".
    expect(() => new Matcher('/foo', '1.0')).not.toThrow()
  })
})