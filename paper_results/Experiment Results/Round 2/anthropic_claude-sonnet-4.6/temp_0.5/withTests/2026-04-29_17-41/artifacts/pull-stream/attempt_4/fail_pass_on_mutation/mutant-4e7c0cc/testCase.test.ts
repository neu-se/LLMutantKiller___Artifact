const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/index.js")

describe('pull partial with 3 through-streams', () => {
  it('correctly processes a pipeline with 3 through-streams as partial', (done) => {
    const add1 = pull.map((x: number) => x + 1)
    const times2 = pull.map((x: number) => x * 2)
    const minus3 = pull.map((x: number) => x - 3)
    
    const partial = pull(add1, times2, minus3)
    
    expect(typeof partial).toBe('function')
    expect(partial.length).toBe(1)
    
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