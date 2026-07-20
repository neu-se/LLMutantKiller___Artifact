import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with duplex stream as first argument", () => {
  it("should use the source property of a duplex stream passed as first argument", (done) => {
    // Create a duplex-like object where source is a readable function
    // and sink is a writable function
    const values = [1, 2, 3, 4, 5]
    let i = 0

    const duplexStream = {
      sink: function(read: Function) {
        // consume the read function (not used in this test)
      },
      source: function(abort: any, cb: Function) {
        if (abort) return cb(abort)
        if (i >= values.length) return cb(true)
        cb(null, values[i++])
      }
    }

    // When pull receives a duplex stream as first arg, it should use duplexStream.source
    // as the readable side. Then we pipe through a map and collect results.
    const collected: number[] = []
    let ended = false

    const read = pull(duplexStream, pull.map((x: number) => x * 2))

    // read should be a function that reads from duplexStream.source mapped by *2
    read(null, function drain(end: any, data: any) {
      if (end === true) {
        ended = true
        expect(collected).toEqual([2, 4, 6, 8, 10])
        done()
        return
      }
      if (end) {
        done(end)
        return
      }
      collected.push(data)
      read(null, drain)
    })
  })
})