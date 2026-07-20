import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('spec /foo/++ should not match root path /', () => {
    const matcher = Matcher.for('/foo/++', '1.1')
    // This should definitely not match / since /foo is required
    expect('/'.match(matcher)).toBeNull()
    // But /foo should match (++ is optional)
    expect('/foo'.match(matcher)).not.toBeNull()
    // And /foo/bar should match
    expect('/foo/bar'.match(matcher)).not.toBeNull()
  })
})