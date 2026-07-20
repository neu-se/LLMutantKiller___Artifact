import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should throw an error with message "Path contains invalid characters" when spec contains invalid characters', () => {
    expect(() => new Matcher('/invalid path!')).toThrow('Path contains invalid characters')
  })
})