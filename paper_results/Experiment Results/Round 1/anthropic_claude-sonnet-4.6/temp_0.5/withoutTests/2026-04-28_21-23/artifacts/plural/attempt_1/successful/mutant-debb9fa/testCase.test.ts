import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize "dwarf" as "dwarfs" not "dwarves"', () => {
    expect(plural('dwarf')).toBe('dwarfs')
  })
})