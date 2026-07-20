import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should accept root path without trailing slash error', () => {
    expect(() => new Matcher('/')).not.toThrow('Path must not end with a slash')
  })
})