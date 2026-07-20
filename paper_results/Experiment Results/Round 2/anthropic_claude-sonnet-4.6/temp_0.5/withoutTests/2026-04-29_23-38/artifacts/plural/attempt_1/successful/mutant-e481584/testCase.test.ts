import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize cello as cellos', () => {
    expect(plural('cello')).toBe('cellos')
  })
})