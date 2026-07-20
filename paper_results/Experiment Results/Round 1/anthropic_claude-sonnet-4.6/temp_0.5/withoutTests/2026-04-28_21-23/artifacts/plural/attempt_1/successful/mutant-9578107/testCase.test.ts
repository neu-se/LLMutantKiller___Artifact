import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should return "roofs" for "roof" (not "rooves")', () => {
    expect(plural('roof')).toBe('roofs')
  })
})