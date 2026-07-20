const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js")

describe('pull with 3 through-streams as partial pipeline', () => {
  it('should correctly process values through a partial with 3 transforms', (done) => {
    const partial = pull(
      pull.map((x: number) => x + 1),
      pull.map((x: number) => x * 2),
      pull.map((x: number) => x - 3)
    )
    pull(
      pull.values([1, 2, 3]),
      partial,
      pull.collect((err: any, arr: number[]) => {
        expect(err).toBeFalsy()
        expect(arr).toEqual([-1, 1, 3])
        done()
      })
    )
  })
})