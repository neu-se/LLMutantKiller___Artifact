import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull compose with 2 throughs", () => {
  it("composed pipeline of 2 through streams applied to source produces correct values", (done) => {
    const results: number[] = []

    // Create through functions
    const addOne = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + 1)
      })
    }

    const triple = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 3)
      })
    }

    // This creates a pipeline factory (length=2 triggers case 2)
    const composed = pull(addOne, triple)

    // Source
    let i = 0
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (i >= 4) return cb(true)
      cb(null, i++)
    }

    // Sink
    const sink = (read: Function) => {
      const go = () => read(null, (end: any, data: any) => {
        if (end === true) {
          expect(results).toEqual([3, 6, 9, 12])
          done()
          return
        }
        if (end) { done(end); return }
        results.push(data)
        go()
      })
      go()
    }

    // Connect: source -> composed -> sink
    pull(source, composed, sink)
  })
})