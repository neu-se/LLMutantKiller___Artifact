import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull case 2/3 mutation", () => {
  it("pipeline factory with 3 through streams works correctly", (done) => {
    // Test with length=3 to exercise the case 3 path
    const pipeline = pull(
      pull.map((x: number) => x + 1),
      pull.map((x: number) => x * 2),
      pull.map((x: number) => x - 1)
    )
    
    pull(
      pull.values([1, 2, 3]),
      pipeline,
      pull.collect((err: any, results: number[]) => {
        expect(err).toBeFalsy()
        expect(results).toEqual([3, 5, 7]) // (1+1)*2-1=3, (2+1)*2-1=5, (3+1)*2-1=7
        done()
      })
    )
  })
})