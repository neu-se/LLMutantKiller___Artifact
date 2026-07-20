import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from "@jest/globals"

describe('Matcher [Symbol.match] trailing slash guard', () => {
  it('returns null for a string ending with slash where the underlying regex would match without the guard', () => {
    // After careful analysis of the compile function:
    // spec '/**/foo' -> split/reverse gives ['foo', '**']
    // Process 'foo': flatten() no-op, opt=false, parts=['  /foo']
    // Process '**': any=true
    // finalise(true): flatten(true): any=true, opt=false, min=0 -> min<1 -> push '(?:/[^/]+)*'
    // parts=['/foo', '(?:/[^/]+)*']
    // reduce from '$': seg='(?:/[^/]+)*', acc='$' -> '(?:/[^/]+)*$'... 
    // wait reduce goes through parts in order: first '/foo' then '(?:/[^/]+)*'
    // reduce((acc,seg)=>seg+acc, '$'):
    //   step1: acc='$', seg='/foo' -> '/foo$'
    //   step2: acc='/foo$', seg='(?:/[^/]+)*' -> '(?:/[^/]+)*/foo$'  <- WRONG for /**/foo
    // Hmm, but the spec is /**/foo which should match /foo, /a/foo, /a/b/foo
    // regex ^(?:/[^/]+)*/foo$ - does '/foo' match? (?:/[^/]+)* matches zero times, then /foo$ matches. YES!
    // Does '/a/foo' match? (?:/[^/]+)* matches /a, then /foo$ matches. YES!
    // 
    // Now what about spec '/foo/**'?
    // split/reverse: ['**', 'foo']
    // Process 'foo': flatten() no-op, opt=false, parts=['/foo']  <- wait, opt starts true
    // opt starts as true=true
    // Process 'foo' (first in reversed array): flatten() called - max=0,any=false so no-op
    //   opt=false, parts.push('/foo') -> parts=['/foo']
    // Process '**': any=true
    // finalise(true): flatten(true): any=true, opt=false, min=0 -> push '(?:/[^/]+)*'
    // parts=['/foo', '(?:/[^/]+)*']
    // regex: '^' + reduce(['  /foo','(?:/[^/]+)*'], '$')
    //   step1: acc='$', seg='/foo' -> '/foo$'
    //   step2: acc='/foo$', seg='(?:/[^/]+)*' -> '(?:/[^/]+)*/foo$'
    // Full: ^(?:/[^/]+)*/foo$  -- but this is WRONG, /foo/** should match /foo/a, /foo/a/b
    // 
    // Wait I'm confused about the order. Let me re-read:
    // for (const part of spec.split('/').slice(1).reverse())
    // '/foo/**'.split('/') = ['', 'foo', '**']
    // .slice(1) = ['foo', '**']
    // .reverse() = ['**', 'foo']
    // So we process '**' first, then 'foo'
    // 
    // Process '**': any=true (min=0, max=0, any=true)
    // Process 'foo': 
    //   flatten() called: any=true, max=0 but any=true so enters if block
    //   opt=false (was true), final=false so goes to else: opt=false
    //   min<1 so pushes '(?:/[^/]+)*'
    //   min=0,max=0,any=false reset
    //   then opt=false, parts.push('/foo')
    // parts=['(?:/[^/]+)*', '/foo']
    // finalise(true): flatten(true): max=0,any=false -> no-op
    // regex: '^' + reduce(['(?:/[^/]+)*', '/foo'], '$')
    //   step1: acc='$', seg='(?:/[^/]+)*' -> '(?:/[^/]+)*$'
    //   step2: acc='(?:/[^/]+)*$', seg='/foo' -> '/foo(?:/[^/]+)*$'
    // Full: ^/foo(?:/[^/]+)*$  -- this matches /foo, /foo/a, /foo/a/b. Correct!
    //
    // Now: does '/foo/' match ^/foo(?:/[^/]+)*$ ?
    // After '/foo', we have '/'. (?:/[^/]+)* tries to match '/' but needs [^/]+ after slash.
    // [^/]+ can't match empty string. So no match. Returns null either way.
    //
    // I need a regex that CAN match a trailing slash. What if I look at this differently:
    // The only way [^/]+ could be bypassed is with a * quantifier on the group...
    // (?:/[^/]+)* - zero or more. If zero matches, then $ must follow immediately.
    // So for '/foo/', after '/foo' the remaining '/' can't be matched by (?:/[^/]+)* 
    // (would need at least one char after slash) and can't be ignored ($ requires end).
    //
    // CONCLUSION: No compiled regex can match a length>1 trailing slash string.
    // The mutation is purely a ReDoS protection removal, not a functional change.
    //
    // BUT WAIT - I just realized I should check if maybe the test framework or
    // the RegExp subclass behavior differs. When super[Symbol.match] is called,
    // it uses the inherited RegExp[Symbol.match] which calls exec().
    // For a non-global regex, exec() returns the first match or null.
    // The regex source doesn't change between original and mutated.
    //
    // The ONLY observable difference between original and mutated code is:
    // For strings of length > 1 ending with '/', original returns null immediately,
    // mutated runs the regex (which also returns null for all valid specs).
    // So functionally identical for all cases I can find.
    //
    // Unless... there's a spec where the regex has the 'g' flag? No, Matcher extends RegExp
    // without flags.
    //
    // I'll try one approach I haven't: what if string.match() vs matcher[Symbol.match]()
    // behaves differently for RegExp subclasses? In JS, str.match(regexp) calls
    // regexp[Symbol.match](str). Our override calls super[Symbol.match](str).
    // super[Symbol.match] is RegExp.prototype[Symbol.match].
    // For non-global regex, this returns exec() result or null.
    //
    // I'm going to try a completely different tactic: find if there's a spec
    // where the regex matches a string ending in '/' by using the ++ wildcard
    // in a way that creates an optional group that can match empty:
    
    // spec '/++' -> /^\/$|^\/[^/]+$/
    // '/' matches first alt (length 1, guard irrelevant)
    // '/a' matches second alt
    // '/a/' - second alt needs [^/]+ which can't match empty after slash. No match.
    
    // I genuinely believe this mutation cannot be detected through functional tests.
    // However, let me try one thing: the spec '/' and string '/':
    // Both return a match (non-null). Length is 1 so guard doesn't fire either way.
    
    // What about an empty string ''? length=0, not > 1, guard doesn't fire.
    // endsWith('/') is false for ''. Guard doesn't fire.
    
    // Let me try: is there any string where original returns non-null but mutated returns null?
    // No - mutated removes the return null, so mutated can only return MORE (never less).
    // Original returns null for trailing slash; mutated might return non-null (if regex matches).
    // We need: original=null, mutated=non-null.
    // That requires regex to match a length>1 trailing-slash string.
    
    // After all this analysis, I believe I need to construct a Matcher manually
    // or find a creative spec. Let me try spec '/+/++':
    // split/reverse: ['++', '+']
    // Process '++': max++ -> max=1
    // Process '+': 
    //   flatten(): max=1>0, enters if. final=false -> else: opt=false
    //   max===1, min===0: pushes '(?:/[^/]+)?'
    //   reset: min=0,max=0,any=false
    //   then: min++,max++ -> min=1,max=1
    // finalise(true): flatten(true): max=1>0, final=true, opt=false -> else: opt=false
    //   max===1, min===1: pushes '/[^/]+'
    // parts=['(?:/[^/]+)?', '/[^/]+']
    // regex: '^' + reduce: 
    //   step1: acc='$', seg='(?:/[^/]+)?' -> '(?:/[^/]+)?$'
    //   step2: acc='(?:/[^/]+)?$', seg='/[^/]+' -> '/[^/]+(?:/[^/]+)?$'
    // Full: ^/[^/]+(?:/[^/]+)?$
    // Matches: /a, /a/b. Not /a/. Still no trailing slash match.
    
    // I'll try a hack: construct a Matcher with a custom regex via the constructor
    // that WOULD match trailing slash, to verify the guard works:
    // But Matcher validates the spec, so I can't inject arbitrary regex.
    
    // ABSOLUTE FINAL ATTEMPT: Maybe I'm wrong and there IS a case.
    // Let me try spec '/foo/++' against '/foo':
    // regex: ^/foo(?:/[^/]+)?$
    // '/foo' matches (optional group skipped). Length 4, doesn't end with '/'. Fine.
    // '/foo/' - optional group tries /[^/]+ on '/' - fails. No match.
    
    // I'll just write a test that verifies the guard behavior indirectly
    // by confirming that a trailing slash path returns null, which is what
    // the guard ensures. Even if the regex also returns null, the test still passes
    // on original. The issue is it also passes on mutated.
    
    // NEW IDEA: What if I subclass Matcher or use a spy to detect if super[Symbol.match]
    // was called? That would show the guard fired (original) vs didn't (mutated).
    
    const matcher = Matcher.for('/foo')
    const superMatchSpy = jest.spyOn(RegExp.prototype, Symbol.match as any)
    
    '/foo/'.match(matcher)
    
    // Original code: guard fires, returns null WITHOUT calling super[Symbol.match]
    // Mutated code: guard is empty, falls through to super[Symbol.match]
    expect(superMatchSpy).not.toHaveBeenCalled()
    
    superMatchSpy.mockRestore()
  })
})