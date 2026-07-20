import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should not match a path with trailing content after a capture', () => {
    const matcher = new Matcher('/:id')
    expect('/foo/bar'.match(matcher)).toBeNull()
    expect('/foo'.match(matcher)).not.toBeNull()
    expect('/foo'.match(matcher)![1]).toBe('foo')
  })
})