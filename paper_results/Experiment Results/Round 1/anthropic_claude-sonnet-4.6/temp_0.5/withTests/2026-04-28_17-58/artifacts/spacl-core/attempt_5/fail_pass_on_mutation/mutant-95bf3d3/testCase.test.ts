import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from "@jest/globals"

describe('Matcher', () => {
  it('matches /foo/++ correctly against paths with zero or one trailing segments', () => {
    const matcher = new Matcher('/foo/++')
    // /foo/++ should match /foo and /foo/bar but not /foo/bar/baz
    expect('/foo'.match(matcher)).not.toBeNull()
    expect('/foo/bar'.match(matcher)).not.toBeNull()
    expect('/foo/bar/baz'.match(matcher)).toBeNull()
    expect('/'.match(matcher)).toBeNull()
  })
})