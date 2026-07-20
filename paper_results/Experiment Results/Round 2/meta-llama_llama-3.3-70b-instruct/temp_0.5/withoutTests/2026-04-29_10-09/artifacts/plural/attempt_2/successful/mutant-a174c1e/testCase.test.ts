import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural function', () => {
  it('should return the singular form when the number is 1 and plural form when the number is not 1', () => {
    expect(plural('cat', 1)).toBe('cat')
    expect(plural('cat', 2)).toBe('cats')
  })
})