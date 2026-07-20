import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher.for() default version parameter', () => {
  it('should use version "1.1" when no version is specified', () => {
    const matcher = Matcher.for('/**')
    expect(matcher.spec).toBe('/**')
    expect(matcher.source).toBe('^/$|^(?:/[^/]+)+$')
  })
})