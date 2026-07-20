import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"
import { describe, it, expect } from "@jest/globals"

describe('Matcher', () => {
  it('returns null for trailing slash paths', () => {
    const matcher = Matcher.for('/foo')
    expect('/foo/'.match(matcher)).toBeNull()
  })
})