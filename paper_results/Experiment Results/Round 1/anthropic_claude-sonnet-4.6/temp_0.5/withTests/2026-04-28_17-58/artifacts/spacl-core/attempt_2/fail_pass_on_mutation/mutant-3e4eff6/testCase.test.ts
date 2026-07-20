import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"
import { describe, it, expect } from "@jest/globals"

describe('Matcher', () => {
  it('should match root path "/" when spec is "/++"', () => {
    const matcher = Matcher.for('/++')
    // /++ means zero or one segment, so it should match the root path "/"
    const result = '/'.match(matcher)
    expect(result).not.toBeNull()
  })
})