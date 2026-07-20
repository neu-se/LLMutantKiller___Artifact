const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js")

describe('pull with 4 through-streams as partial', () => {
  it('should handle duplex streams in a partial with 4 items', (done) => {
    // Use a duplex stream as one of the 4 items
    const through = pull.through()
    
    const partial = pull(
      pull.map((x: number) => x + 1),
      through,  // duplex object
      pull.map((x: number) => x * 2),
      pull.map((x: number) => x - 3)
    )
    
    pull(
      pull.values([1, 2, 3]),
      partial,
      pull.collect((err: any, arr: number[]) => {
        expect(err).toBeNull()
        expect(arr).toEqual([1, 3, 5])
        done()
      })
    )
  })
})