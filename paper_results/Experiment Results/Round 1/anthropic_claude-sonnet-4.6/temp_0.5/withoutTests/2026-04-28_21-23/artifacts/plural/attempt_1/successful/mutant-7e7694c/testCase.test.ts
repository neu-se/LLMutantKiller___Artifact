import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should return "dwarfs" for "dwarf" (special case that should not follow f/fe -> ves rule)', () => {
    expect(plural('dwarf')).toBe('dwarfs')
  })
})