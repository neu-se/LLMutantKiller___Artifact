import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('should use version 1.1 semantics by default, accepting ++ as a valid optional wildcard', () => {
    // ++ is valid in version 1.1 but invalid in versions 1 and 1.0
    // Default constructor should accept it (original default: '1.1')
    expect(() => new Matcher('/foo/++')).not.toThrow()
    
    // Verify matching behavior of ++ (optional single segment)
    const m = new Matcher('/foo/++')
    expect(m.test('/foo')).toBe(true)      // ++ matches 0 segments
    expect(m.test('/foo/bar')).toBe(true)   // ++ matches 1 segment
    expect(m.test('/foo/bar/baz')).toBe(false) // ++ doesn't match 2 segments
    expect(m.spec).toBe('/foo/++')
    
    // Verify that explicit version 1 rejects ++
    expect(() => new Matcher('/foo/++', '1')).toThrow('Path contains malformed wildcards')
    expect(() => new Matcher('/foo/++', '1.0')).toThrow('Path contains malformed wildcards')
  })
})