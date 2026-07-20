const pull = require('../../../../../../../../../../../subject_repositories/pull-stream/index.js')

describe('pull with duplex stream object', () => {
  test('should correctly pipe through a duplex stream object with sink and source', (done) => {
    function makeDuplex() {
      let _read: Function
      return {
        sink: function(read: Function) { _read = read },
        source: function(abort: any, cb: Function) { _read(abort, cb) }
      }
    }
    
    const duplex = makeDuplex()
    
    pull(
      pull.values([1, 2, 3]),
      duplex,
      pull.collect(function(err: any, ary: number[]) {
        expect(err).toBeFalsy()
        expect(ary).toEqual([1, 2, 3])
        done()
      })
    )
  })
})