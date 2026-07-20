import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull with 2 through streams (case 2 in switch)", () => {
  it("should correctly apply 2 through streams when pull is used as a pipeline factory", (done) => {
    // Create a pipeline with exactly 2 through functions (triggers case 2 in the switch)
    // The mutation removes the body of case 2, causing it to fall through to case 3
    // which would call pull(read, ref[0], ref[1], ref[2]) with ref[2] being undefined
    
    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }

    const addOne = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + 1)
      })
    }

    // Create a pipeline factory with exactly 2 through streams
    const pipeline = pull(double, addOne)

    // pipeline should be a function that accepts a read source
    expect(typeof pipeline).toBe("function")
    expect(pipeline.length).toBe(1)

    // Now use the pipeline with a source
    const source = (abort: any, cb: Function) => {
      let i = 0
      const values = [1, 2, 3]
      if (abort) return cb(abort)
      if (i >= values.length) return cb(true)
      cb(null, values[i++])
    }

    // Create a proper source
    let idx = 0
    const values = [1, 2, 3]
    const src = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (idx >= values.length) return cb(true)
      cb(null, values[idx++])
    }

    const read = pipeline(src)

    const results: number[] = []
    const readAll = () => {
      read(null, (end: any, data: any) => {
        if (end === true) {
          // Expected: [1*2+1, 2*2+1, 3*2+1] = [3, 5, 7]
          expect(results).toEqual([3, 5, 7])
          done()
          return
        }
        if (end) {
          done(end)
          return
        }
        results.push(data)
        readAll()
      })
    }

    readAll()
  })
})