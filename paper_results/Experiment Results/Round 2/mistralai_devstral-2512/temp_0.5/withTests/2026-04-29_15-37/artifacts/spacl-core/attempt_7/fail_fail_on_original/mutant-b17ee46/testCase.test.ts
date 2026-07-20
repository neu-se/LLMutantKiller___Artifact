import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher.for() default version parameter', () => {
  it('should throw error when version is empty string', () => {
    expect(() => {
      Matcher.for('/test', '')
    }).toThrow('Path contains malformed wildcards')
  })
})