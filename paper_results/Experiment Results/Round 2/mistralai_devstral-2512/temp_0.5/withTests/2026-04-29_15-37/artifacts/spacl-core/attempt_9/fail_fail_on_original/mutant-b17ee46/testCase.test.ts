import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher.for() default version parameter', () => {
  it('should accept version 1.1 features when no version specified', () => {
    const matcher = Matcher.for('/**/test')
    expect(matcher.spec).toBe('/**/test')
    expect(matcher.source).toBe('^(?:/[^/]+)*/test$')
  })
})