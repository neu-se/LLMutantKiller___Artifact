import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with duplex stream source", () => {
  it("should unwrap source from duplex stream when passed as first argument", (done) => {
    // Create a simple through/duplex stream with both source and sink
    const values = [1, 2, 3, null]
    let index = 0

    // A duplex stream has both source and sink properties
    const duplex = {
      source: function(end: any, cb: Function) {
        if (end) return cb(end)
        const val = values[index++]
        if (val === null) {
          cb(true)
        } else {
          cb(null, val)
        }
      },
      sink: function(read: Function) {
        // consume all values and discard
        function next() {
          read(null, function(end: any, data: any) {
            if (!end) next()
          })
        }
        next()
      }
    }

    const collected: number[] = []

    // Create a sink that collects values
    const sink = {
      sink: function(read: Function) {
        function next() {
          read(null, function(end: any, data: any) {
            if (end) {
              expect(collected).toEqual([1, 2, 3])
              done()
              return
            }
            collected.push(data)
            next()
          })
        }
        next()
      }
    }

    // When pull receives a duplex stream as first argument, it should use duplex.source
    // The original code does: read = read.source (unwraps the source)
    // The mutated code does nothing, leaving read as the duplex object
    pull(duplex, sink)
  })
})