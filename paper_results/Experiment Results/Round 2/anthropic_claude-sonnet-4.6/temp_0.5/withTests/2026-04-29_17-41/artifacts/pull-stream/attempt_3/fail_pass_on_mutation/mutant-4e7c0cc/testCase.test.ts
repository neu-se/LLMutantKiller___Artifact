const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js")

describe('pull partial pipeline with exactly 4 through-streams', () => {
  it('should correctly process values through a partial with 4 transforms', (done) => {
    const partial = pull(
      pull.map((x: number) => x + 1),
      pull.map((x: number) => x * 2),
      pull.map((x: number) => x - 3),
      pull.map((x: number) => x * 10)
    )
    
    pull(
      pull.values([1, 2, 3]),
      partial,
      pull.collect((err: any, arr: number[]) => {
        expect(err).toBeFalsy()
        expect(arr).toEqual([10, 30, 50])
        done()
      })
    )
  })
})