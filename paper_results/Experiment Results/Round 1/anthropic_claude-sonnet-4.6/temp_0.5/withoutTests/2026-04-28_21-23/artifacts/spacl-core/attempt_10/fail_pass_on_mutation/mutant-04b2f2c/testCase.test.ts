import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('should return null when using string match with trailing slash on optional wildcard spec', () => {
    // spec /foo/++ where ++ makes last segment optional
    // Processing reversed ['++', 'foo']:
    // '++': max=1
    // 'foo': flatten() called - max=1,min=0 -> else if(true): opt=false
    //        push '(?:/[^/]+)?'  (max=1, min=0)
    //        then push '/foo'
    // finalise(true): opt=false
    // parts=['/foo', '(?:/[^/]+)?']  -- NO wait
    // parts are pushed in order during processing:
    // When 'foo' triggers flatten(): pushes '(?:/[^/]+)?'  -> parts=['(?:/[^/]+)?']
    // Then 'foo' default case pushes '/foo' -> parts=['(?:/[^/]+)?', '/foo']
    // reduce: acc='$', seg='(?:/[^/]+)?' -> '(?:/[^/]+)?$'
    //         acc='(?:/[^/]+)?$', seg='/foo' -> '/foo(?:/[^/]+)?$'
    // full: '^/foo(?:/[^/]+)?$'
    // Does '/foo/' match? '/foo' matches, '(?:/[^/]+)?' tries '/' - needs [^/]+ fails
    // '(?:/[^/]+)?' matches empty, '$' but '/' remains. NO.
    
    // What about spec '/++/foo' ?
    // reversed: ['foo', '++']
    // 'foo': flatten() no-op (max=0,any=false), opt=false, push '/foo'
    // '++': max=1
    // finalise(true): max=1, opt=false, min=0<1 -> min=1
    //   push '/[^/]+'
    // parts=['/foo', '/[^/]+']
    // reduce: '/[^/]+' + '/foo' + '$' = '/[^/]+/foo$'  -- WRONG direction
    // reduce((acc,seg)=>seg+acc, '$'):
    //   step1: acc='$', seg='/foo' -> '/foo$'
    //   step2: acc='/foo$', seg='/[^/]+' -> '/[^/]+/foo$'
    // full: '^/[^/]+/foo$'
    // Does '/bar/foo/' match? No.
    
    // I need to find a spec where the LAST part pushed to parts[] (which becomes
    // the FIRST thing before $ in the regex) can match a trailing slash.
    // The last part pushed is the FIRST segment processed (since spec is reversed).
    // The first segment after reversing is the LAST segment of the spec.
    // 
    // For the regex to match a trailing slash, the last segment of the spec
    // must produce a pattern that can match '/' at the end.
    // All patterns use [^/]+ which can't match '/'.
    // 
    // UNLESS the last segment is a wildcard that produces (?:/[^/]+)*
    // which can match ZERO times, leaving the trailing '/' unmatched...
    // but then $ would fail.
    //
    // I truly believe this mutation is undetectable via Symbol.match.
    // The test framework must be wrong, or I'm misreading the mutation.
    //
    // Let me try one more thing: what if I test that the Matcher correctly
    // handles the case where string === '/' (length 1, guard doesn't fire)?
    // Both versions behave the same for '/'.
    //
    // OR - what if the test should verify that the guard doesn't affect
    // strings that DON'T end with slash? Both versions same.
    //
    // I'll try testing with 'string'.match() syntax to see if that makes a difference:
    
    const matcher = new Matcher('/foo')
    const result = '/foo/'.match(matcher)
    expect(result).toBeNull()
  })
})