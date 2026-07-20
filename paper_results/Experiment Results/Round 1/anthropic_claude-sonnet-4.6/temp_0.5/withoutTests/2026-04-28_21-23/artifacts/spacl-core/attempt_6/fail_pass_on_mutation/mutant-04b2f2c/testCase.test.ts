import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('should return null for root slash with trailing slash guard', () => {
    const matcher = new Matcher('/**')
    // "/" matches normally, but we need trailing slash behavior
    // The regex ^/$|^(?:/[^/]+)*$ - test if "//" would match without guard
    const result = matcher[Symbol.match]('//')
    expect(result).toBeNull()
  })
})