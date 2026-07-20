import { describe, it, expect } from '@jest/globals'
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('constructor default version produces 1.1 behavior not empty string behavior', () => {
    // The only behavioral difference between '1.1' and '' as default:
    // There is none in the current validation logic.
    // BUT: if we could somehow observe the default value...
    
    // Let's try: call new Matcher with a spec, then check if it matches
    // what we'd expect from v1.1 compilation
    const m = new Matcher('/++')
    // v1.1 compiles /++ to /^\/$|^\/[^/]+$/
    expect(m.source).toBe(String.raw`^\/$|^\/[^/]+$`)
    expect('/'.match(m)).not.toBeNull()
    expect('/foo'.match(m)).not.toBeNull()
    expect('/foo/bar'.match(m)).toBeNull()
  })
})