import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should throw an error with the message "Path contains malformed wildcards" for invalid wildcard paths', () => {
    expect(() => new Matcher('/foo*bar')).toThrow('Path contains malformed wildcards')
  })
})