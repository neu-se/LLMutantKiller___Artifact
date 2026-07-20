import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher constructor', () => {
  it('should throw an error with message "Path must begin with a slash" when spec does not start with a slash', () => {
    expect(() => new Matcher('noslash')).toThrow('Path must begin with a slash')
  })
})