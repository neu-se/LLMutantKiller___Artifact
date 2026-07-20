import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('should correctly handle a capture-only path and populate props', () => {
    // Test with a path that has only a capture segment
    // The opt variable starts true, and with a capture, flatten() is called
    // which may affect the final regex differently
    const matcher = new Matcher('/:x/y')
    expect(matcher.props).toEqual(['x'])
    
    // Should match /something/y
    expect('/foo/y'.match(matcher)).not.toBeNull()
    // Should not match /y alone
    expect('/y'.match(matcher)).toBeNull()
    // Should not match /foo/bar
    expect('/foo/bar'.match(matcher)).toBeNull()
  })
})