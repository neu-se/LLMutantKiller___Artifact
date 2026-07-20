import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should throw an error with message "Path contains malformed wildcards" for malformed wildcard paths', () => {
    expect(() => new Matcher('/foo*bar')).toThrow('Path contains malformed wildcards')
  })
})