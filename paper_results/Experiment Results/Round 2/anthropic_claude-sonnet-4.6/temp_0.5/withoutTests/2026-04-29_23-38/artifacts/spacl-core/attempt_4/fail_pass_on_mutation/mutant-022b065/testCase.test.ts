import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should not throw for a valid path with no trailing slash', () => {
    expect(() => new Matcher('/foo/bar')).not.toThrow()
  })
})