import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should produce correct regex source for a capture path', () => {
    const matcher = new Matcher('/:id')
    // Should contain a capture group
    expect(matcher.source).toContain('([^/]+)')
    expect(matcher.props).toEqual(['id'])
  })
})