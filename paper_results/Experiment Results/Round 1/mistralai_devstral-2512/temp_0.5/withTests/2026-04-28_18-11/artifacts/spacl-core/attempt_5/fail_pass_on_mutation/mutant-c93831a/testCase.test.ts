import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher Symbol.match behavior', () => {
  it('should handle trailing slash condition correctly', () => {
    const matcher = Matcher.for('/foo')
    const testString = '/foo/'
    const result = matcher[Symbol.match](testString)
    expect(result).toBeNull()
  })
})