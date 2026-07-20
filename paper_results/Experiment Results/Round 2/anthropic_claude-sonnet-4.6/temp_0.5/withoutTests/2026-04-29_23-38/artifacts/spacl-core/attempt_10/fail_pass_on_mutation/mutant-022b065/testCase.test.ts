import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('should throw for path ending with slash', () => {
    expect(() => new Matcher('/foo/')).toThrow('Path must not end with a slash')
  })
})