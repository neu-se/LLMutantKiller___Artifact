import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize bacterium to bacteria', () => {
    expect(plural('bacterium')).toBe('bacteria')
  })
})