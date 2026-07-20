import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('should return null for a string ending with slash when length is greater than 1', () => {
    // For spec '/**', regex is '^/$|^(?:/[^/]+)+$'
    // The string '/a/' ends with '/' and has length 3
    // Original: guard fires, returns null
    // Mutated: guard is empty (no return), falls through to super[Symbol.match]
    // The regex '^/$|^(?:/[^/]+)+$' does NOT match '/a/' so mutated also returns null
    //
    // We need a spec whose regex WOULD match a trailing-slash string.
    // The only regex that could match a trailing slash is one where '/' is valid at end.
    // Since all segment patterns use [^/]+, no compiled regex can match trailing slash.
    //
    // BUT: what if we use exec() directly on the Matcher (bypassing the override)?
    // exec() is not overridden, so it uses the raw regex.
    // The raw regex for '/**' is '^/$|^(?:/[^/]+)+$'
    // exec('/') returns match (matches '^/$')
    // exec('/foo/') returns null (no match)
    //
    // The mutation is truly dead code. However, let me verify by checking
    // that the [Symbol.match] override is actually called and returns null
    // for a trailing slash, while exec (which bypasses the override) would
    // behave differently IF the regex matched.
    //
    // Since no regex matches trailing slash, I'll test the one observable difference:
    // the guard prevents calling super[Symbol.match] for trailing-slash strings.
    // This means even if somehow the regex matched, original returns null.
    //
    // The only way to kill this mutant is to find a regex that matches trailing slash.
    // Let me try: what about using the Matcher as a regex directly with test()?
    // test() bypasses [Symbol.match] override.
    
    // Actually - I realize I should check: does ANY string ending in '/' match
    // the regex for any spec? Let me try spec='/**' and string='/':
    // '/' length=1, guard doesn't apply. '/' matches '^/$'. Returns match in both.
    
    // The ONLY observable difference would be if regex matches trailing-slash string.
    // For spec that generates '^/$|^...$', the '^/$' matches '/' (length 1, guard skipped).
    // For any string with length>1 ending in '/', no compiled regex matches.
    
    // This mutation cannot be killed. But I'll write the best test I can.
    const matcher = Matcher.for('/**')
    
    // Test that '/' (length=1, guard doesn't apply) still matches
    expect('/'.match(matcher)).not.toBeNull()
    
    // Test that '/foo/' (length>1, ends with '/') returns null
    // Both original and mutated return null here, but for different reasons
    expect('/foo/'.match(matcher)).toBeNull()
  })
})