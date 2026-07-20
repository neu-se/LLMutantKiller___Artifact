import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize words ending in vowel+o correctly (stereo -> stereos)', () => {
    expect(plural('stereo')).toBe('stereos')
  })
})