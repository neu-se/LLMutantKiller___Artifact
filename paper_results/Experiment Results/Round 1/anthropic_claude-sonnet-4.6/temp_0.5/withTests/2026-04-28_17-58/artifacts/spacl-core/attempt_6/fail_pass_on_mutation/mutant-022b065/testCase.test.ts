import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('should correctly handle specs that contain slash characters within them', () => {
    // A spec like "/foo/bar" should NOT be rejected as having a trailing slash
    // Original: /^.+\/$/ does not match "/foo/bar" (doesn't end with /)
    // Mutated: /.+\/$/ - could this match "/foo/bar"? No, doesn't end with /
    // But what about a spec "/foo/bar" where the regex engine finds "/foo/" as a match?
    // /.+\/$/ on "/foo/bar": tries to find .+\/ ending at $
    // $ anchors to end, so the \/ must be the last char - "/foo/bar" ends with "r", not "/"
    // So no difference here either
    
    // The ONLY case: spec ends with / but doesn't start matchably from pos 0
    // Since that's impossible with these chars, let me verify normal behavior
    const matcher = new Matcher('/foo/bar')
    expect(matcher.spec).toBe('/foo/bar')
    expect('/foo/bar'.match(matcher)).not.toBeNull()
    expect('/foo/bar/'.match(matcher)).toBeNull()
  })
})