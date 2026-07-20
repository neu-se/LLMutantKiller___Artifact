import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with duplex stream as first argument", () => {
  it("should use the source property of a duplex stream passed as first argument", (done) => {
    const values = [1, 2, 3, 4, 5]
    let i = 0

    // A duplex-like object with a source function
    const duplexStream = {
      sink: function(read: Function) {
        // not used in this test
      },
      source: function(abort: any, cb: Function) {
        if (abort) return cb(abort)
        if (i >= values.length) return cb(true)
        cb(null, values[i++])
      }
    }

    // When pull receives a duplex stream as first arg, it should extract duplexStream.source
    // as the readable side. The result should be a readable function.
    const read = pull(duplexStream)

    // If the mutation is present, read will be the duplexStream object itself (not source),
    // and calling read(null, cb) will fail or not work correctly.
    // With original code, read === duplexStream.source, a proper readable function.
    const collected: number[] = []

    function drain(end: any, data: any) {
      if (end === true) {
        expect(collected).toEqual([1, 2, 3, 4, 5])
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