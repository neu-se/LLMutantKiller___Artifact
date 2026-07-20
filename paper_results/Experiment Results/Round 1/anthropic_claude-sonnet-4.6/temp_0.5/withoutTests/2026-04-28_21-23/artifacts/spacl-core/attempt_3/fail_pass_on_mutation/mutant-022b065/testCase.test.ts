import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should throw for path ending with slash', () => {
    // Test that a path ending with slash correctly throws
    // This tests the trailing slash validation
    expect(() => new Matcher('/foo/')).toThrow('Path must not end with a slash')
    // Also verify that removing the trailing slash makes it valid
    expect(() => new Matcher('/foo')).not.toThrow()
  })
})