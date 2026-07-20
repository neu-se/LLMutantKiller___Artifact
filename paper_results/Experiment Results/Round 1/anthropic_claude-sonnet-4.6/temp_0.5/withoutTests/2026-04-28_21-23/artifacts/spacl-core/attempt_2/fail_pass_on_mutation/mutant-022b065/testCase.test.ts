import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should not throw for root path "/" which is a single slash', () => {
    // Root path "/" should be valid - it starts with "/" but the regex
    // ^.+\/$ requires at least one char before the trailing slash,
    // so "/" alone should not trigger the "must not end with slash" error
    // The mutated regex .+\/$ behaves the same for "/"
    // But let's verify the root path works correctly
    expect(() => new Matcher('/')).not.toThrow()
  })
})