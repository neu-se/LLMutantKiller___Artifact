import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher', () => {
  it('accepts root path spec and matches root path correctly', () => {
    const m = new Matcher('/')
    expect(m.spec).toBe('/')
    expect('/'.match(m)).not.toBeNull()
    expect('/foo'.match(m)).toBeNull()
  })
})