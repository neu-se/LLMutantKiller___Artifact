import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull with partial sink of 2 through-streams', () => {
  it('should correctly apply 2 through-streams when using partial application', (done) => {
    // Create a partial sink with exactly 2 through-streams (triggers case 2)
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

    // Create a partial pipeline with exactly 2 through-streams
    // This triggers `case 2` in the switch statement
    const pipeline = pull(double, addOne)

    // pipeline should be a function of length 1 (partial sink)
    expect(typeof pipeline).toBe('function')
    expect(pipeline.length).toBe(1)

    // Now provide a source to complete the pipeline
    const source = (abort: any, cb: Function) => {
      let i = 0
      const values = [1, 2, 3]
      if (abort) return cb(abort)
      if (i >= values.length) return cb(true)
      cb(null, values[i++])
    }

    // Collect results manually
    const results: number[] = []
    
    // Apply source to the partial pipeline
    const read = pipeline(source)

    expect(typeof read).toBe('function')

    // Read all values
    const readNext = () => {
      read(null, (end: any, data: any) => {
        if (end === true) {
          // With original code: [1*2+1, 2*2+1, 3*2+1] = [3, 5, 7]
          // With mutated code: case 2 falls through and returns undefined
          expect(results).toEqual([3, 5, 7])
          done()
          return
        }
        if (end) {
          done(end)
          return
        }
        results.push(data)
        readNext()
      })
    }

    readNext()
  })
})