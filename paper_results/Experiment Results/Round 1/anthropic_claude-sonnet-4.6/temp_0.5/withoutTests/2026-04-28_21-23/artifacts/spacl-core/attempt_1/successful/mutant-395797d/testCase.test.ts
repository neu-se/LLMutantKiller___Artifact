import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should throw an error with message "Path contains empty segments" when path has empty segments', () => {
    expect(() => new Matcher('/foo//bar')).toThrow('Path contains empty segments')
  })
})