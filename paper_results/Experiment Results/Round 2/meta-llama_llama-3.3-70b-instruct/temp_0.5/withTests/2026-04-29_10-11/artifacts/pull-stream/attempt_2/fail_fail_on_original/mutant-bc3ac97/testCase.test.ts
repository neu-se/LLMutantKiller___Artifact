import { pull } from '../../pull.js'

describe('pull', () => {
  it('should handle the case when length is 3', () => {
    const read = pull(
      pull.values([1, 2, 3]),
      (a: number) => a * 2,
      (a: number) => a + 1,
      (a: number) => a * 3
    )

    let result: any[] = []
    read(null, function (end: any, data: any) {
      if (end) {
        // pass
      } else {
        result.push(data)
      }
    })

    expect(result).toEqual([18])
  })
})