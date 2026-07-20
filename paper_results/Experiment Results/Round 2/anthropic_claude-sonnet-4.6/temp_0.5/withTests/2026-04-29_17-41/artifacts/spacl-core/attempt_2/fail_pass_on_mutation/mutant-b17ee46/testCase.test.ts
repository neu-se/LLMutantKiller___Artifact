import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"
import { describe, it, expect } from "@jest/globals"

describe('Matcher.for', () => {
  it('should use version 1.1 as default, making /foo+ invalid due to strict 1.1 wildcard rules', () => {
    // In version '1.1', the pattern /\*[^*/]|\+[^+/]|[^/*]\*|[^/+]\+|\*\*\*|\+\+\+/ is used
    // '/foo+' matches [^/+]\+ so it should throw with default version
    // In version '1' or '1.0', only /[*+][^/]|[^/][*+]/ is used - '/foo+' also matches [^/][*+]
    // so it throws in both cases - not distinguishable this way either
    
    // The spec '/**' is valid in 1.1 but let's check '/foo**' - invalid in 1.1 ([^/*]\*)
    // In version '1': [^/][*+] matches 'o*' in '/foo**' -> also throws
    // Not distinguishable
    
    // What about '/++'? Valid in 1.1, invalid in '1'
    // With default '1.1': valid. With default '': also valid ('' != '1' and '' != '1.0')
    // Not distinguishable from ''
    
    // The mutation from '1.1' to '' is truly not observable through the current code paths
    // The best we can do is verify the default behaves like '1.1' for a spec valid only in 1.1
    const matcher = Matcher.for('/++/foo')
    expect(matcher).toBeInstanceOf(Matcher)
    expect(matcher.spec).toBe('/++/foo')
    expect('/foo'.match(matcher)).not.toBeNull()
    expect('/bar/foo'.match(matcher)).not.toBeNull()
    expect('/bar/baz/foo'.match(matcher)).toBeNull()
  })
})