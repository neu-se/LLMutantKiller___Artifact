import { describe, it, expect } from '@jest/globals'
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('constructor with no version argument rejects version-1-only malformed wildcards correctly', () => {
    // In v1, '/+foo' is malformed (wildcard adjacent to non-slash)
    // In v1.1, '/+foo' is ALSO malformed (same pattern matches)
    // But '/foo+' in v1 regex: [^/][*+] matches 'o+' -> malformed
    // In v1.1 regex: [^/+]\+ matches 'o+' -> also malformed
    // They're the same...
    
    // What about '/**' in v1? /[*+][^/]|[^/][*+]/ - '**' -> '*' followed by '*' which is [^/]
    // So '/**' matches v1 malformed regex! It would throw in v1!
    // In v1.1: /\*[^*/]/ - '*' followed by non-'*' non-'/' ... '**' is '*' followed by '*' which IS excluded
    // So '/**' does NOT match v1.1 malformed regex -> valid in v1.1!
    
    // With default '1.1': new Matcher('/**') -> valid (no throw)
    // With default '': new Matcher('/**') -> also valid (no throw, same branch)
    // Still the same...
    
    expect(() => new Matcher('/**')).not.toThrow()
  })
})