import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull partial application with 2 through-streams', () => {
  it('should return undefined when case 2 has no return statement (mutant) vs correct result (original)', () => {
    // Create two simple through-streams (transforms)
    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }

    const addTen = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + 10)
      })
    }

    // This creates a partial sink with exactly 2 through-streams,
    // triggering `case 2` in the switch statement.
    const pipeline = pull(double, addTen)

    // Should be a function of length 1 (partial sink)
    expect(typeof pipeline).toBe('function')
    expect(pipeline.length).toBe(1)

    // Create a proper stateful source
    const values = [1, 2, 3]
    let index = 0
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (index >= values.length) return cb(true)
      cb(null, values[index++])
    }

    // Apply the source to the partial pipeline
    // Original: returns pull(read, ref[0], ref[1]) which is a valid read function
    // Mutant: case 2 falls through to case 3 which calls pull(read, ref[0], ref[1], ref[2])
    //         where ref[2] is undefined, causing incorrect behavior
    const read = pipeline(source)

    // On original code, read should be a valid function
    // On mutated code, case 2 falls through to case 3: pull(read, ref[0], ref[1], ref[2])
    // where ref[2] is undefined - this causes pull to call undefined(read) which throws or returns undefined

    const results: number[] = []
    let ended = false

    // Read first value synchronously
    read(null, (end: any, data: any) => {
      if (!end) results.push(data)
      else ended = true
    })

    read(null, (end: any, data: any) => {
      if (!end) results.push(data)
      else ended = true
    })

    read(null, (end: any, data: any) => {
      if (!end) results.push(data)
      else ended = true
    })

    read(null, (end: any, data: any) => {
      ended = true
    })

    // Original: [1*2+10, 2*2+10, 3*2+10] = [12, 14, 16]
    expect(results).toEqual([12, 14, 16])
    expect(ended).toBe(true)
  })
})