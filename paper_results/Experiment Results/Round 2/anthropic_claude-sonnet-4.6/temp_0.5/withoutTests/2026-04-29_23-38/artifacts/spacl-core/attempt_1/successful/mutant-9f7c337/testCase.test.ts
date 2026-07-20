import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher malformed wildcard detection for version 1.0', () => {
  it('should throw an error for path with non-slash character before wildcard in version 1.0', () => {
    // In the original code, [^/][*+] matches 'a*' in '/a*', causing an error to be thrown
    // In the mutated code, [/][*+] only matches '/*', so '/a*' would NOT match and no error is thrown
    expect(() => new Matcher('/a*', '1.0')).toThrow('Path contains malformed wildcards')
  })
})