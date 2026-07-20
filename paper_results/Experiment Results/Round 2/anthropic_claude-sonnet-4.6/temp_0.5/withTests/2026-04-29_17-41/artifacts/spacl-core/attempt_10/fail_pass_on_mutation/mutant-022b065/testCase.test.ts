import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('correctly handles spec with only valid path characters ending without slash', () => {
    const m = Matcher.for('/foo/bar')
    expect(m.spec).toBe('/foo/bar')
    expect('/foo/bar'.match(m)).not.toBeNull()
    expect('/foo/bar/'.match(m)).toBeNull()
  })
})