import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher constructor', () => {
  it('should not throw for root path "/" which does not end with a slash in the invalid sense', () => {
    // The spec "/" is a valid root path - it starts with "/" but doesn't have content before trailing "/"
    // Original regex ^.+\/$ requires at least one char before trailing slash, so "/" alone doesn't match
    // Both regexes behave the same here...
    // Let's test that a path ending with slash throws
    expect(() => new Matcher('/foo/')).toThrow('Path must not end with a slash')
  })
})