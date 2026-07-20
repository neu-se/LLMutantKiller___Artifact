import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher mutation detection', () => {
  it('should match "/" against "/++/++" where both segments are optional (min=0)', () => {
    const matcher = Matcher.for('/++/++', '1.1')
    // With min=0, max=2, opt=true at flatten(true):
    // Original: min>0 is false, opt stays true → regex has '^/$|^' prefix → '/' matches
    // Mutated: opt set to false → regex has '^' prefix only → '/' does not match
    expect('/'.match(matcher)).not.toBeNull()
  })
})