const pull = require('../../../../../../../../../../../subject_repositories/pull-stream/index.js')

describe('pull with duplex stream object that transforms data', () => {
  test('duplex object should transform values in pipeline', (done) => {
    // Create a duplex that doubles each value
    function makeDoublingDuplex() {
      let _read: (abort: any, cb: Function) => void
      return {
        sink: function(read: (abort: any, cb: Function) => void) { _read = read },
        source: function(abort: any, cb: Function) {
          _read(abort, function(end: any, data: any) {
            if (end) cb(end)
            else cb(null, data * 2)
          })
        }
      }
    }
    
    const duplex = makeDoublingDuplex()
    
    pull(
      pull.values([1, 2, 3]),
      duplex,
      pull.collect(function(err: any, ary: number[]) {
        expect(err).toBeFalsy()
        expect(ary).toEqual([2, 4, 6])
        done()
      })
    )
  })
})