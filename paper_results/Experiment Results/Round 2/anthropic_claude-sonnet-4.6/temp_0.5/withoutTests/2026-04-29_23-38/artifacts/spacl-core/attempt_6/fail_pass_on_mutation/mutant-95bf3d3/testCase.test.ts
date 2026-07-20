import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('spec "/++" should not match a single slash followed by nothing special', () => {
    const matcher = new Matcher('/++', '1.1')
    // '/foo' should match (one optional segment)
    expect('/foo'.match(matcher)).not.toBeNull()
    // '/' should match because ++ makes segments optional (min=0)
    // In original: regex is '^/$|^(?:/[^/]+)?$' which explicitly matches '/'
    // In mutated: regex is '^(?:/[^/]+)?$' which does NOT match '/'
    expect('/'.match(matcher)).not.toBeNull()
  })
})