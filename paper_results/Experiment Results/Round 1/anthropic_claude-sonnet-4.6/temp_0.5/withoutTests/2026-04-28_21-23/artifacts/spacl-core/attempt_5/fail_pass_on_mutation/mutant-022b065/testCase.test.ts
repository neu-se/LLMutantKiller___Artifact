import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should not throw for path /foo/bar which does not end with slash', () => {
    expect(() => new Matcher('/foo/bar')).not.toThrow()
  })
})