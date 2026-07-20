import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize "chaos" as "chaoses" following the s-ending rule', () => {
    expect(plural('chaos')).toBe('chaoses')
  })
})