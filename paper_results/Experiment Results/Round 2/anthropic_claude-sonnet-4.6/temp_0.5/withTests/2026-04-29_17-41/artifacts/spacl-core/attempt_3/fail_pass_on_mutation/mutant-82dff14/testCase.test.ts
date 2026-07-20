import { describe, it, expect } from '@jest/globals'
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('compiles and works correctly', () => {
    const m = Matcher.for('/foo')
    expect('/foo'.match(m)).not.toBeNull()
  })
})