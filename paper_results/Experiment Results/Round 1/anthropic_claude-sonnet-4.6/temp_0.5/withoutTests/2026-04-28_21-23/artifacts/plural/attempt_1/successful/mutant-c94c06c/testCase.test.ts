import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize "roof" correctly by adding "s" not converting to "rooves"', () => {
    expect(plural('roof')).toBe('roofs')
  })
})