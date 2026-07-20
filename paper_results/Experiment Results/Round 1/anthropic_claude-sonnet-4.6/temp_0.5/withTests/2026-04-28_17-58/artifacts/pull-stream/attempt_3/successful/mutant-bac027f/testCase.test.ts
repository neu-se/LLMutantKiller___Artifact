import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull with duplex object as first argument', () => {
  it('should extract source from first argument when it has a source function', (done) => {
    const values = [1, 2, 3]
    let i = 0

    // A duplex-like object with a source function
    const duplexObj = {
      source: function(abort: any, cb: (end: any, data?: any) => void) {
        if (abort) return cb(abort)
        if (i >= values.length) return cb(true)
        cb(null, values[i++])
      }
    }

    // Simple through function that doubles values
    function doubler(read: Function) {
      return function(abort: any, cb: (end: any, data?: any) => void) {
        read(abort, function(end: any, data: any) {
          if (end) return cb(end)
          cb(null, data * 2)
        })
      }
    }

    // In original: duplexObj.source is extracted as read, then doubler wraps it
    // In mutated: duplexObj itself is used as read, doubler wraps the object (not a function), causing failure
    const read = pull(duplexObj, doubler)

    const collected: number[] = []

    function drain(end: any, data: any): void {
      if (end === true) {
        expect(collected).toEqual([2, 4, 6])
        done()
        return
      }
      if (end) {
        done(end)
        return
      }
      collected.push(data)
      read(null, drain)
    }

    read(null, drain)
  })
})