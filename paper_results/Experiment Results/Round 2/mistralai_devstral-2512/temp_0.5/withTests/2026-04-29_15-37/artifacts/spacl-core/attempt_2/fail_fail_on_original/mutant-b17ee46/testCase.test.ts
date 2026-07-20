import { Matcher } from '../src/matcher'

describe('Matcher.for() default version parameter', () => {
  it('should use version "1.1" when no version is specified', () => {
    const matcher = Matcher.for('/test')
    expect(matcher.spec).toBe('/test')
    expect(() => Matcher.for('/**')).not.toThrow()
  })
})