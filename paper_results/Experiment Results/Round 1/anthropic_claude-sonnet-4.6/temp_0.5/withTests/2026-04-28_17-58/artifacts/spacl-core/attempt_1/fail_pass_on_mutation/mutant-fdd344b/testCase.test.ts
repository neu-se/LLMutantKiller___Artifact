import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"
import { describe, it, expect } from "@jest/globals"

describe('Matcher malformed wildcard detection in version 1.0', () => {
  it('should reject a path with adjacent wildcards like /+* in version 1.0', () => {
    expect(() => Matcher.for('/+*', '1.0')).toThrow('Path contains malformed wildcards')
  })
})