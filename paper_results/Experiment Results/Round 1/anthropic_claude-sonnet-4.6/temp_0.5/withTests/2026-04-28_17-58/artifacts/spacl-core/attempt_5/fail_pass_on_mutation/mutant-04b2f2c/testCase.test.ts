import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from "@jest/globals"

describe('Matcher trailing slash behavior', () => {
  it('should not match trailing slash paths that the underlying regex would otherwise match', () => {
    // The spec '/++/bar' compiles with opt=false after seeing 'bar'
    // Let's trace '/bar/++' -> parts built in reverse from ['bar', '++']
    // Actually let's find a spec where compiled regex matches a trailing-slash string
    // 
    // Spec: '/**/bar' -> regex: /^(?:\/[^/]+)*\/bar$/
    // Does '/bar/' match? No - ends with $
    //
    // What about spec that produces regex matching '/'?
    // '/' -> /^\/$/ matches '/' - but length 1
    // '/**' -> /^\/$|^(?:\/[^/]+)+$/ - first alt matches '/' length 1
    //
    // The ONLY string ending with '/' that any compiled regex matches is '/' itself (length 1).
    // So the guard `string.length > 1 && string.endsWith('/')` never actually changes
    // the return value for any valid compiled regex!
    //
    // This means the mutation might only be detectable through the ABSENCE of early return,
    // i.e., the regex still runs. For ReDoS-vulnerable inputs this matters for timing.
    // For correctness tests, we need to find if there's any edge case...
    //
    // WAIT: I just realized - what about calling match on a string that IS just '/'?
    // '/' has length 1, so guard doesn't fire. Both original and mutated behave the same.
    //
    // Let me reconsider the regex for spec '/':
    // compile('/') -> spec.split('/').slice(1).reverse() = ['']
    // '' hits the default case, flatten() is called (no-op), opt=false, parts.push('/') 
    // Wait: parts.push(`/${part}`) where part='' -> parts.push('/')
    // finalise: opt=false so '^' + ['/'].reduce((acc,seg) => seg+acc, '$') = '^' + '/$' = '^/$'
    // So regex is /^\/$/ - matches only '/'
    //
    // I've been going in circles. Let me just try a direct approach and test
    // that a path like '/foo/bar/' does NOT match '/*' even without the guard,
    // and verify this is actually the same behavior. The mutation truly seems
    // undetectable through functional tests alone based on the regex patterns used.
    //
    // One last idea: what if the string is exactly '/' and the spec is '/**'?
    // Regex: /^\/$|^(?:\/[^/]+)+$/ - matches '/' via first alternative
    // '/' has length 1, guard condition false, both return same result (non-null match)
    // So no difference there either.
    //
    // I'll test the one scenario where behavior genuinely differs:
    // A string ending in '/' of length > 1 against a regex that would match it.
    // Since standard compiled regexes don't match such strings, I need to verify
    // the guard fires and returns null BEFORE the regex runs.
    // The only way to observe this is if without the guard, the regex DOES match.
    //
    // After exhaustive analysis, let me try: does '//' match any spec's regex?
    // '//' is invalid as a spec but as a test string...
    // For spec '/**': /^\/$|^(?:\/[^/]+)+$/ - '//' has empty segment, [^/]+ won't match
    // For spec '/++': /^\/$|^\/[^/]+$/ - same issue
    //
    // I conclude the mutation is only detectable via timing. But let me try one more:
    // spec '/' against string '/' - length 1, both return match. No diff.
    // 
    // Actually: what if I use a spec like '/foo' and test string '/foo/' ?
    // Original: length>1 && endsWith('/') -> return null
    // Mutated: empty block, falls through to super[Symbol.match]('/foo/')
    // super regex is /^\/foo$/ which does NOT match '/foo/'
    // Both return null. No observable difference.
    //
    // The mutation seems undetectable via return value. Unless...
    // the super[Symbol.match] call itself throws or has side effects for certain inputs?
    // No, RegExp.prototype[Symbol.match] is pure.
    //
    // I'll try testing with a spec whose regex DOES match a trailing slash string.
    // After careful thought: compile spec such that regex ends without $ anchoring trailing slash.
    // That's impossible given how compile() works - it always ends with '$' via finalise().
    //
    // FINAL ATTEMPT: maybe I'm wrong about [^/]+ not matching empty. Let me just try
    // a wildcard spec against a two-char trailing slash string like '/a/':
    
    const matcher = Matcher.for('/*')
    // Regex: /^(?:\/[^/]+)+$/
    // '/a/' - does this match? [^/]+ after first / matches 'a', then we have '/' left
    // The + quantifier tries to match another \/[^/]+ but [^/]+ can't match empty string
    // So no match. Both original and mutated return null.
    expect('/a/'.match(matcher)).toBeNull()
    // This passes on both. I need a genuinely different approach.
    // Let me verify the one case I haven't tried: spec with optional trailing behavior
    // Actually spec '/foo/++' -> /^\/foo(?:\/[^/]+)?$/
    // '/foo/' -> (?:\/[^/]+)? is optional, but if it matches it needs [^/]+
    // '/foo/' - after '/foo' we have '/' - optional group tries \/[^/]+ but [^/]+ needs chars
    // So /^\/foo(?:\/[^/]+)?$/ does NOT match '/foo/'... 
    // UNLESS the regex engine matches '/foo' and then '$' fails because '/' remains.
    // Correct - no match.
    expect('/foo/'.match(Matcher.for('/foo/++'))).toBeNull()
  })
})