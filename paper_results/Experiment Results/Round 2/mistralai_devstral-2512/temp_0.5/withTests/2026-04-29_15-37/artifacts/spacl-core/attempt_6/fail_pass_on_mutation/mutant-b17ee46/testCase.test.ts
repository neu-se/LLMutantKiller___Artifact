import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher.for() default version parameter', () => {
  it('should accept version "1.1" features when no version is specified', () => {
    expect(() => {
      Matcher.for('/**')
    }).not.toThrow()
  })
})