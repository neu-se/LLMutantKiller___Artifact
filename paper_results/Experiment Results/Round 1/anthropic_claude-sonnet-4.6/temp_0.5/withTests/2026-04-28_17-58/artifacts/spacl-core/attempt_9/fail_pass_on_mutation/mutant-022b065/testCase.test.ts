import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('correctly compiles root path spec and matches paths', () => {
    const m = Matcher.for('/')
    expect('/'.match(m)).not.toBeNull()
    expect('/foo'.match(m)).toBeNull()
    expect('/foo/'.match(m)).toBeNull()
  })
})