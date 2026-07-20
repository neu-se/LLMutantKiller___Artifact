import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should throw an error with message "Path contains malformed captures" for malformed capture syntax', () => {
    expect(() => new Matcher('/foo:bar')).toThrow('Path contains malformed captures')
  })
})