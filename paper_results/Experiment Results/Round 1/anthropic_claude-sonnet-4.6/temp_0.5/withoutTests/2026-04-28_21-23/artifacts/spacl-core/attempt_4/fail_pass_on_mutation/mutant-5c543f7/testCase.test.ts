import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should treat a single-character segment starting with colon as a capture', () => {
    const matcher = new Matcher('/:a')
    expect(matcher.props).toEqual(['a'])
    expect('/test'.match(matcher)).not.toBeNull()
    expect('/test'.match(matcher)![1]).toBe('test')
  })
})