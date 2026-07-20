import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should accept root path "/" as valid', () => {
    expect(() => new Matcher('/')).not.toThrow()
    const m = new Matcher('/')
    expect(m.spec).toBe('/')
  })
})