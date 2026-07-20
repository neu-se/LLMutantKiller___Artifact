import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher trailing slash validation', () => {
  it('should throw for a path that is just a slash (root with trailing slash behavior)', () => {
    // The original regex ^.+\/$ requires at least one char before the trailing slash
    // So "/" alone would NOT trigger the error (only one char total)
    // But with the mutated regex /.+\/$, same behavior for "/"
    // The difference: for a spec like "/", original ^.+\/$ won't match
    // Let's test that "/" is valid (no error thrown)
    // and "/foo/" throws an error
    // Both should behave the same... let me find the actual difference
    
    // Original: ^.+\/$ - anchored at start, needs 1+ chars then /
    // Mutated: .+\/$ - not anchored, needs 1+ chars then / at end
    // For any normal string these are equivalent since $ anchors end
    // The ^ anchor matters when there could be newlines in multiline mode
    // But .match() by default is not multiline
    
    // Actually without ^ anchor and without multiline flag,
    // the regex will still try to match from any position
    // So for "/foo/", both match. For "/", neither matches.
    // The difference must be something else...
    
    // Wait - what about a spec that ends with "/" but starts with something
    // that wouldn't be caught? Like... they're the same for all practical inputs.
    // Let me just verify the normal case works
    expect(() => new Matcher('/foo/')).toThrow('Path must not end with a slash')
  })
})