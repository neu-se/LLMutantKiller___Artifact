import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher Symbol.match behavior', () => {
  it('should correctly handle the trailing slash condition in Symbol.match', () => {
    const matcher = Matcher.for('/test')
    const result = matcher[Symbol.match]('/test/')
    expect(result).toBeNull()
  })
})