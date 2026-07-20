import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('matcher mutation detection', () => {
  it('does not match "/" with /foo/** spec', () => {
    const matcher = Matcher.for('/foo/**')
    // Original regex: ^\/$|^(?:\/[^/]+)*\/foo$
    // Mutated regex:  ^(?:\/[^/]+)*\/foo$
    // '/' matches original via ^\/$  but should NOT match /foo/**
    // Wait - this would mean original is WRONG to match '/'
    // Let me instead check that the regex source differs in a way that affects /foo matching
    // Actually the real question: does original regex match '/' for /foo/**?
    // That seems like a bug... let me check /foo instead
    // For /foo: matches ^\/$? No. Matches ^(?:\/[^/]+)*\/foo$? 
    // (?:\/[^/]+)* matches zero times, then \/foo matches /foo → YES
    // So /foo matches both original and mutated for /foo/**
    // But '/' matches original (^\/$) - is that correct behavior?
    // The existing tests show /foo/** should NOT match '/'
    // So original has a bug here, or my analysis is wrong
    // Let me just test the actual behavior
    expect('/'.match(matcher)).toBeNull()
  })
})