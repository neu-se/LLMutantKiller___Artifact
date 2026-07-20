import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('matcher mutation detection', () => {
  it('matches /foo with /foo/** in original but not mutated', () => {
    const matcher = Matcher.for('/foo/**')
    // Reversed segments: ['**', 'foo']
    // Process '**': any=true, min=0, max=0
    // Process 'foo': calls flatten(false) with any=true, min=0
    //   Original: final=false so (final && opt && min<1) is false; else if (min>0) false → opt stays true
    //   Mutated:  final=false so (final && opt && min<1) is false; else if (true) → opt=false
    // Then opt=false, parts gets '/foo' pushed, opt set to false
    // finalise() calls flatten(true) with min=0,max=0,any=false → skipped
    // Original opt=true → regex = ^\/$|^... wait opt was already true before foo processing
    // The opt in finalise affects the prefix: opt=true → '^/$|^' + parts + '$'
    // Original: opt=true → regex matches '/'... but /foo/** shouldn't match '/'
    // Let me check: does /foo match /foo/**?
    expect('/foo'.match(matcher)).not.toBeNull()
  })
})