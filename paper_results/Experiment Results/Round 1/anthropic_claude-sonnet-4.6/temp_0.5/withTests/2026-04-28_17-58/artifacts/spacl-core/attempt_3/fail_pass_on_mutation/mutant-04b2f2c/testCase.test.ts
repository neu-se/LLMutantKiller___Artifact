import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from "@jest/globals"

describe('Matcher trailing slash behavior', () => {
  it('should not match a valid path that has a trailing slash appended', () => {
    // /foo matches /foo but should NOT match /foo/
    // The original code returns null for any string ending with /
    // The mutated code removes the return null, so the regex runs and may match
    const matcher = Matcher.for('/**')
    // '/**' compiles to /^\/$|^(?:\/[^/]+)+$/ which would match '/foo/bar' but not '/foo/'
    // However with the mutation, the early return is gone so the regex runs on '/foo/'
    // The regex /^\/$|^(?:\/[^/]+)+$/ does NOT match '/foo/' so this won't work
    // Instead use a spec where the compiled regex WOULD match a trailing-slash path
    // '/foo/' against Matcher.for('/foo/') - but that's invalid spec
    // Use Matcher.for('/') which compiles to /^\/$/ - this matches '/' exactly
    // '/' has length 1, so the condition `string.length > 1` is false - won't trigger
    // Need a path like '/foo/' where the regex might match without the guard
    // Matcher.for('/foo') compiles to /^\/foo$/ - won't match '/foo/'
    // Matcher.for('/foo/+') compiles to /^\/foo\/[^/]+$/ - won't match '/foo/bar/'
    // The key: find a spec whose regex matches a trailing-slash string
    // Matcher.for('/+/') is invalid. 
    // Actually: '/foo/' against /^\/$|^(?:\/[^/]+)+$/ - [^/]+ won't match empty string after last /
    // Let me check: Matcher.for('/**/') is invalid
    // The mutation removes the guard entirely - so we need regex that matches trailing slash
    // '/foo/bar/' against /^\/foo(?:\/[^/]+)*$/ for '/foo/**' - [^/]+ won't match empty
    // The only way: the regex itself must match. Since [^/]+ requires at least one non-slash char,
    // trailing slash paths won't match most regexes.
    // BUT: Matcher.for('/') matches '/' - and '/' ends with '/' but length is 1, so no guard.
    // Wait - let me reconsider. The guard is `string.length > 1 && string.endsWith('/')`.
    // For '/foo/', length=5 > 1, ends with '/'. Original returns null. Mutated runs regex.
    // Matcher.for('/foo/++') - compiles to /^\/foo(?:\/[^/]+)?$/ - won't match '/foo/bar/'
    // I need a regex that matches a string ending in '/'. That seems impossible with [^/]+.
    // UNLESS the spec itself is just '/' - but length check prevents that.
    // Re-reading: the compiled regex for '/' is /^\/$/ which matches only '/'.
    // Hmm, maybe the test should verify '/' itself doesn't trigger (length=1).
    // Actually the mutation makes the block empty - so for '/foo/' it no longer returns null
    // and falls through to super[Symbol.match]. If the regex doesn't match, result is still null.
    // So the behavior only differs when the regex WOULD match a trailing-slash string.
    // This seems impossible with the current regex patterns... unless I'm wrong.
    // Let me just verify the guard works for a known case from existing tests.
    const m = Matcher.for('/foo')
    expect('/foo/'.match(m)).toBeNull()
    expect('/foo'.match(m)).not.toBeNull()
  })
})