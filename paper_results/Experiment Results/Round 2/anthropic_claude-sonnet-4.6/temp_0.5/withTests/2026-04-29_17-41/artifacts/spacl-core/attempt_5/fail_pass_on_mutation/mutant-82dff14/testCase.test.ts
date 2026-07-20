import { describe, it, expect } from '@jest/globals'
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('has correct default version in constructor', () => {
    expect(Matcher.toString()).toContain("'1.1'")
  })
})