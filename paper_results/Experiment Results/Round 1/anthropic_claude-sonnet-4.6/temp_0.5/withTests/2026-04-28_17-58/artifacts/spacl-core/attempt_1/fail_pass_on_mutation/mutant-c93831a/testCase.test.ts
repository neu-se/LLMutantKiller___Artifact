import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"
import { describe, it, expect } from "@jest/globals"

describe('Matcher trailing slash handling', () => {
  it('should return null when matching a path with a trailing slash', () => {
    const matcher = Matcher.for('/foo')
    // A path with a trailing slash (length > 1 and ends with '/') should not match
    const result = '/foo/'.match(matcher)
    expect(result).toBeNull()
  })
})