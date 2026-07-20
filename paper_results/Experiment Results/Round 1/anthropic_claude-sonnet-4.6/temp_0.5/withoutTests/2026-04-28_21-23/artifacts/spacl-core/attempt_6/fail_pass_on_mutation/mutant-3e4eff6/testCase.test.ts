import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher with non-final flatten and min=0 wildcard', () => {
  it('spec "/foo/**" should match "/foo" since ** allows zero segments', () => {
    const matcher = Matcher.for('/foo/**', '1.1')
    // Processing reversed: ['**', 'foo']
    // '**': any=true, min=0, max=0
    // 'foo': calls flatten() with final=false
    //   flatten(false): any=true, max=0||any=true
    //   final=false so NOT in (final&&opt&&min<1) branch
    //   Original: else if (min > 0) → min=0, false → opt stays true
    //   Mutated: else if (true) → opt = false
    //   Then pushes wildcard segment, resets
    //   Then pushes /foo segment, opt=false (from default case)
    // finalise: opt is already false in both cases from 'foo' processing
    // Hmm, opt gets set false in default case anyway...
    expect('/foo'.match(matcher)).not.toBeNull()
  })
})