import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('does not match root path when spec has a required capture segment', () => {
    const matcher = Matcher.for('/:foo')
    expect('/'.match(matcher)).toBeNull()
    expect('/bar'.match(matcher)).not.toBeNull()
  })
})