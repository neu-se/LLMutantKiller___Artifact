import { describe, it, expect } from '@jest/globals'
import find from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js'
import values from '../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js'

describe('find sink - end of stream without match', () => {
  it('should call callback with null error when stream ends without finding a match', (done) => {
    const source = values([1, 2, 3, 4, 5])
    const sink = find(
      (d: number) => d === 99,
      (err: any, result: any) => {
        expect(err).toBeNull()
        expect(result).toBeNull()
        done()
      }
    )
    sink(source)
  })
})