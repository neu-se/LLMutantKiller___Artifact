import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should create a valid Matcher for root path', () => {
    const m = new Matcher('/')
    expect(m.spec).toBe('/')
    expect('/' .match(m)).not.toBeNull()
  })
})