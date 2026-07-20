import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should accept a valid path with version 1.0 without throwing malformed wildcards error', () => {
    expect(() => new Matcher('/foo/bar', '1.0')).not.toThrow()
  })
})