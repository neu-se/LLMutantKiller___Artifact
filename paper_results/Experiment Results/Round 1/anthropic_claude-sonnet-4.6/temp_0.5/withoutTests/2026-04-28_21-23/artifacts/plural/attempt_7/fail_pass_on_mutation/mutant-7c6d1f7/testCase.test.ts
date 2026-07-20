import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should return singular form when num is 1 for vowel+o words', () => {
    expect(plural('cameo', 1)).toBe('cameo')
  })
})