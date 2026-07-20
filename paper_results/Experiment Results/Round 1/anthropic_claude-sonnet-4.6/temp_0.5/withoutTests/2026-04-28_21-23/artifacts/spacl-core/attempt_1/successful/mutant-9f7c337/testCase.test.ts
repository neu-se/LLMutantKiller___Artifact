import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher malformed wildcard detection', () => {
  it('should throw an error for a path with a non-slash character before a wildcard in version 1.0', () => {
    expect(() => {
      new Matcher('/a*', '1.0')
    }).toThrow('Path contains malformed wildcards')
  })
})