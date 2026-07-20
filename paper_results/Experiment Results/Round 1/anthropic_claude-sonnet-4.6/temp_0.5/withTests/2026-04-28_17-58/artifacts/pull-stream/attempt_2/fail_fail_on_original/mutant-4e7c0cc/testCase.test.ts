import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull partial sink with 3 arguments', () => {
  it('correctly chains 3 through streams when used as partial sink', (done) => {
    const partialSink = pull(
      pull.map((x: number) => x + 1),
      pull.map((x: number) => x * 2),
      pull.map((x: number) => x - 1)
    )

    pull(
      pull.values([1, 2, 3]),
      partialSink,
      pull.collect((err: any, arr: number[]) => {
        expect(err).toBeFalsy()
        expect(arr).toEqual([3, 5, 7])
        done()
      })
    )
  })
})