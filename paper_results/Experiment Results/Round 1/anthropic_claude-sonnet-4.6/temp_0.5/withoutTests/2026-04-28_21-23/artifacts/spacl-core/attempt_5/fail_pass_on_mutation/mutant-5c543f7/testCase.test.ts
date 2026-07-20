import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should match root path when spec has only optional wildcards before capture', () => {
    const matcher = new Matcher('/**/:id')
    expect(matcher.props).toEqual(['id'])
    expect('/foo'.match(matcher)).not.toBeNull()
  })
})