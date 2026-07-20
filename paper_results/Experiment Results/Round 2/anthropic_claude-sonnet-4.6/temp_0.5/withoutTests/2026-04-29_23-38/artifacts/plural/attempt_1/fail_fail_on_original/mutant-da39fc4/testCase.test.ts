import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize dwarf as dwarves, not dwarfs', () => {
    expect(plural('dwarf')).toBe('dwarves')
  })
})