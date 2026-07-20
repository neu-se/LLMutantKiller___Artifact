import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('/++/bar matches /bar with zero optional segments', () => {
    const matcher = new Matcher('/++/bar')
    expect('/bar'.match(matcher)).not.toBeNull()
    expect('/foo/bar'.match(matcher)).not.toBeNull()
    expect('/'.match(matcher)).toBeNull()
  })
})