import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull loop boundary', () => {
  it('should not iterate past the last argument', (done) => {
    const values = require('../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js')
    const collect = require('../../../../../../../../../../../subject_repositories/pull-stream/sinks/collect.js')
    
    pull(
      values([1, 2, 3]),
      collect((err: any, arr: any[]) => {
        expect(err).toBeNull()
        expect(arr).toEqual([1, 2, 3])
        done()
      })
    )
  })
})