import { pull } from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should handle two arguments correctly', () => {
    const read = pull(
      pull.values([1, 2, 3]),
      pull.map((x: number) => x * 2)
    )

    let result: number[] = []
    read(null, (end: any, data: number) => {
      if (end) return
      result.push(data)
    })

    read(null, (end: any, data: number) => {
      if (end) return
      result.push(data)
    })

    read(null, (end: any, data: number) => {
      if (end) return
      result.push(data)
    })

    expect(result).toEqual([2, 4, 6])
  })
})