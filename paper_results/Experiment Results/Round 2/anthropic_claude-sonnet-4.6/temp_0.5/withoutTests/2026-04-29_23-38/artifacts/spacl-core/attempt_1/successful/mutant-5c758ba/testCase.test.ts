import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should throw an error with message "Path must not end with a slash" when path ends with a slash', () => {
    expect(() => new Matcher('/foo/')).toThrow('Path must not end with a slash')
  })
})