import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull with duplex object as first argument', () => {
  it('should use source property from first argument object when it has a source function', (done) => {
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

    const collected: number[] = []

    // In original: duplexObj.source is extracted as read, then the sink processes it
    // In mutated: duplexObj itself is used as read, causing incorrect behavior
    const read = pull(duplexObj, pull.map((x: number) => x * 2))

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