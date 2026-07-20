import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should accept a valid simple path with version 1.0', () => {
    expect(() => new Matcher('/foo', '1.0')).not.toThrow()
  })
})