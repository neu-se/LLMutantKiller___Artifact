import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('duo should become duos', () => {
    expect(plural('duo')).toBe('duos')
  })
})