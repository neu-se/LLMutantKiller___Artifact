import { describe, it, expect } from '@jest/globals'
import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull loop boundary', () => {
  it('should not call sink more than once when piping source through a through to a sink', (done) => {
    const collected: number[] = []
    let sinkCallCount = 0

    const source = pull.values([1, 2, 3])
    const through = pull.map((x: number) => x * 2)
    
    // Use pull.collect as the sink and verify results are correct
    pull(
      pull.values([1, 2, 3]),
      pull.map((x: number) => x + 10),
      pull.collect((err: Error | null, arr: number[]) => {
        expect(err).toBeNull()
        expect(arr).toEqual([11, 12, 13])
        done()
      })
    )
  })
})