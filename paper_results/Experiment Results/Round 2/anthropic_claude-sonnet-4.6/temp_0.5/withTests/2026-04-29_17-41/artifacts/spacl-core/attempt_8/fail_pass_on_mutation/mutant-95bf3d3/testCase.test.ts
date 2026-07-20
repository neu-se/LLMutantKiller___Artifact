import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('Matcher.for with default version accepts ++ wildcards and matches correctly', () => {
    const matcher = Matcher.for('/foo/++')
    expect('/foo'.match(matcher)).not.toBeNull()
    expect('/foo/bar'.match(matcher)).not.toBeNull()
    expect('/foo/bar/baz'.match(matcher)).toBeNull()
    expect('/'.match(matcher)).toBeNull()
  })
})