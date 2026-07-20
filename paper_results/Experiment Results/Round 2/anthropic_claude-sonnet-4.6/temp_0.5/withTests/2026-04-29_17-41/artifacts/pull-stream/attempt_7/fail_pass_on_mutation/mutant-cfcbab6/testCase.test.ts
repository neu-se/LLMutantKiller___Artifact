import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull', () => {
  it('returns source when called with only a source argument', () => {
    const source = (abort: any, cb: Function) => cb(true)
    const result = pull(source)
    expect(result).toBe(source)
  })
})