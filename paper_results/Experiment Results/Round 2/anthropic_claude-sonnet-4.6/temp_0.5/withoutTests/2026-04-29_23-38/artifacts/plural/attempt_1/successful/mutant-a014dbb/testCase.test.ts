import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should return "dwarfs" for "dwarf"', () => {
    expect(plural('dwarf')).toBe('dwarfs')
  })
})