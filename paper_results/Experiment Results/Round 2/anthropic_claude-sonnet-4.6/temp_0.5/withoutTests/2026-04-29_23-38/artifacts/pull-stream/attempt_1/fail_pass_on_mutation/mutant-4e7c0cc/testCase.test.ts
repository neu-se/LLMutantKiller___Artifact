import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with 3 through streams (case 4 in partial sink)", () => {
  it("should correctly pipe source through 3 transforms and into a sink when using partial application", () => {
    const results: number[] = []

    // Create a simple source that emits 1, 2, 3
    const source = (end: any, cb: (end: any, data?: number) => void) => {
      let i = 0
      const values = [1, 2, 3]
      if (end) return cb(end)
      if (i >= values.length) return cb(true)
      // We need a stateful source
      cb(null, values[i++])
    }

    // Actually let's use a proper stateful source
    function createSource(values: number[]) {
      let i = 0
      return (end: any, cb: (end: any, data?: number) => void) => {
        if (end) return cb(end)
        if (i >= values.length) return cb(true)
        cb(null, values[i++])
      }
    }

    // Create a through stream that doubles values
    function doubler() {
      return (read: (end: any, cb: (end: any, data?: number) => void) => void) => {
        return (end: any, cb: (end: any, data?: number) => void) => {
          read(end, (end: any, data?: number) => {
            if (end) return cb(end)
            cb(null, data! * 2)
          })
        }
      }
    }

    // Create a sink that collects values
    function collectSink(arr: number[]) {
      return (read: (end: any, cb: (end: any, data?: number) => void) => void) => {
        function next() {
          read(null, (end: any, data?: number) => {
            if (end) return
            arr.push(data!)
            next()
          })
        }
        next()
      }
    }

    // This creates a partial sink with 3 through streams (length=3 in the partial function)
    // When called with a source, it becomes case 4: pull(read, ref[0], ref[1], ref[2])
    // Wait, let me re-read the code...
    // length is the number of args passed to the outer pull call
    // case 3 in switch means length=3, so: pull(read, ref[0], ref[1], ref[2])
    // The PLACEHOLDER is case 3, not case 4

    // Let me re-read: the mutation is at case 3 line
    // Original case 3: return pull(read, ref[0], ref[1], ref[2])
    // Mutated case 3: (empty - falls through to case 4)

    // So we need to test with length=3 (3 args to the partial pull)
    const partialSink = pull(doubler(), doubler(), collectSink(results))

    // partialSink is a function that takes a read (source)
    // When called, it should execute pull(read, doubler(), doubler(), collectSink(results))
    partialSink(createSource([1, 2, 3]))

    // Each value goes through two doublers: 1->2->4, 2->4->8, 3->6->12
    expect(results).toEqual([4, 8, 12])
  })
})