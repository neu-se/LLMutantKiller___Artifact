import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('should correctly compile a capture with a two-character name and match paths', () => {
    const matcher = new Matcher('/:id')
    // props should contain 'id' (2 chars)
    expect(matcher.props).toEqual(['id'])
    // Should match any single segment
    const result = '/hello'.match(matcher)
    expect(result).not.toBeNull()
    expect(result![1]).toBe('hello')
    // Should not match root
    expect('/'.match(matcher)).toBeNull()
    // Should not match two segments
    expect('/hello/world'.match(matcher)).toBeNull()
  })
})