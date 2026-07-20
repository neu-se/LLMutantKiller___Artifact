import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should handle two arguments correctly', () => {
    const read = pull(
      pull.values([1, 2]),
      pull.map((x: number) => x * 2)
    )

    let result: number[] = []
    pull(
      read,
      pull.collect((err: any, data: number[]) => {
        if (err) throw err
        result = data
      })
    )

    expect(result).toEqual([2, 4])
  })
})