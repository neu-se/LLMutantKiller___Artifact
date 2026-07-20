import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher regex source', () => {
  it('spec "/**" should produce regex that includes the root path alternative', () => {
    const matcher = Matcher.for('/**')
    // Original produces: ^/$|^(?:/[^/]+)*$
    // Mutated produces:  ^(?:/[^/]+)*$
    expect(matcher.source).toContain('^/$|')
  })
})