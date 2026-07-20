import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('should handle the case when length is 3', () => {
    const values = [1, 2, 3]
    let result: any[] = []

    pull(
      pull.values(values),
      pull.map((x: number) => x * 2),
      pull.map((x: number) => x + 1),
      pull.collect((err: any, data: any[]) => {
        result = data
      })
    )

    expect(result).toEqual([3, 5, 7])
  })
})