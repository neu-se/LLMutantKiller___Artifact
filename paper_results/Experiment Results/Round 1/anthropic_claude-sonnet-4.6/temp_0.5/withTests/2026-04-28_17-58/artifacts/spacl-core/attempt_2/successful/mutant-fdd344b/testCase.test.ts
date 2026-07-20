import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"
import { describe, it, expect } from "@jest/globals"

describe('Matcher wildcard validation in version 1.0', () => {
  it('should accept a valid path with wildcard followed by slash like /*/foo in version 1.0', () => {
    expect(() => Matcher.for('/*/foo', '1.0')).not.toThrow()
  })
})