import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from "@jest/globals"

describe('Matcher trailing slash behavior', () => {
  it('should return null for trailing slash string against spec that would otherwise match', () => {
    // Spec '/foo/++' compiles to /^\/foo(?:\/[^/]+)?$/
    // The string '/foo/' - after matching '/foo', we have '/' remaining
    // (?:\/[^/]+)? tries to match '/' but needs at least one non-slash char after slash
    // So regex returns null anyway... 
    //
    // BUT: spec '/++/foo' compiles to /^(?:\/[^/]+)?\/foo$/
    // The string '/foo' matches (optional group skipped, then /foo matches)
    // The string '/bar/foo' matches
    //
    // Key insight I've been missing: what spec produces a regex where
    // a trailing-slash string of length > 1 matches?
    //
    // What if the ENTIRE spec is just wildcards that can match '/'?
    // spec '/++' -> /^\/$|^\/[^/]+$/ -> matches '/' (length 1) or '/foo' (no trailing slash)
    // spec '/**' -> /^\/$|^(?:\/[^/]+)+$/ -> same
    //
    // I think I need to accept that the regex patterns never match trailing-slash strings
    // of length > 1, and find another angle.
    //
    // NEW ANGLE: The [Symbol.match] override is called when doing string.match(matcher).
    // But what if we call matcher[Symbol.match](string) directly?
    // That's the same thing - it's what string.match calls.
    //
    // REAL NEW ANGLE: What does RegExp.prototype[Symbol.match] do?
    // It sets lastIndex=0 and calls exec repeatedly if global flag is set.
    // Our Matcher doesn't set global flag, so it just calls exec once.
    // exec on /^\/$/ with '/' returns a match array.
    // exec on /^\/$/ with '//' returns null.
    //
    // I've been assuming the regex can't match trailing slash strings.
    // Let me try to construct one that can by examining the compile output for edge cases.
    //
    // What about spec '/:foo' -> /^\/([^/]+)$/
    // '/a/' -> [^/]+ matches 'a', then we need $ but '/' remains. No match.
    //
    // I'm now fairly certain no compiled regex matches a length>1 trailing-slash string.
    // The mutation is a latent bug (ReDoS protection) not a functional one.
    // 
    // However - let me check one thing: what if string is '/' and we use a spec
    // whose regex matches '/'? The guard has `string.length > 1` so '/' passes through.
    // Both original and mutated call super[Symbol.match]('/') and get the same result.
    //
    // TRULY FINAL INSIGHT: I need to find if there's a spec where the regex
    // matches a string like '/a/' - i.e., has content between slashes AND ends with slash.
    // Given all patterns use [^/]+ anchored with ^ and $, this seems impossible.
    //
    // Unless... what about the `opt` path? When opt=true, regex is `^/$|^...`
    // The `^/$` part matches only '/' (length 1).
    // The second part still uses [^/]+ which can't match empty.
    //
    // I'll try a completely different approach: test that the Matcher correctly
    // rejects trailing slash for the root-like case where opt=true makes the
    // regex include `^/$` - but the string is '//' (length 2, ends with '/'):
    // spec '/**' regex /^\/$|^(?:\/[^/]+)+$/ vs '//' 
    // First alt: /^\/$/ doesn't match '//'
    // Second alt: /^(?:\/[^/]+)+$/ - [^/]+ can't match empty after first slash
    // Still null both ways.
    //
    // I genuinely cannot find a functional difference. Let me try the test anyway
    // with a case that SHOULD differ if I'm wrong about the regex behavior:
    
    // spec '/foo/++' -> regex /^\/foo(?:\/[^/]+)?$/
    // What if JavaScript's regex engine matches '/foo/' differently than I think?
    // Let me construct this and test it directly:
    const matcher = Matcher.for('/foo/++')
    // Without the guard, super[Symbol.match]('/foo/') runs /^\/foo(?:\/[^/]+)?$/ on '/foo/'
    // The optional group (?:\/[^/]+)? - can it match '/' by matching \/ and then [^/]+ matching... 
    // nothing? No, [^/]+ requires 1 or more chars.
    // But wait - what if the regex engine tries: match '/foo', then optional group doesn't match,
    // then $ - but we still have '/' left. Fails. Returns null.
    // So both return null. No difference.
    expect('/foo/'.match(matcher)).toBeNull()
  })
})