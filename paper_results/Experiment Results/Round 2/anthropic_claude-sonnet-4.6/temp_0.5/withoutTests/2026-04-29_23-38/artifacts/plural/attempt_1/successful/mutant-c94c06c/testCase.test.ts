import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize "roof" as "roofs" not "rooves"', () => {
    expect(plural('roof')).toBe('roofs')
  })
})