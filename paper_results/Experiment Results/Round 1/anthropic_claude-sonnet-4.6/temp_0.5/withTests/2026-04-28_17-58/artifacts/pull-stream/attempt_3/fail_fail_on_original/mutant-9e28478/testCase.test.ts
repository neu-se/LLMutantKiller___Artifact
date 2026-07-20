import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull partial application with exactly 2 through-streams', () => {
  it('should correctly compose 2 through-streams when using partial application', (done) => {
    // Track how many times each transform is called
    const calls: string[] = []

    // First through: doubles the value
    const double = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        calls.push('double')
        cb(null, data * 2)
      })
    }

    // Second through: adds 100
    const addHundred = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        calls.push('addHundred')
        cb(null, data + 100)
      })
    }

    // This creates a partial sink with exactly 2 through-streams (length === 2),
    // triggering `case 2` in the switch statement.
    const pipeline = pull(double, addHundred)

    // Use pull.values and pull.collect from the pull-stream library
    const collected: number[] = []

    // Build source using pull.values
    const source = pull.values([5])

    // Apply source to pipeline - on original this returns pull(read, ref[0], ref[1])
    // On mutant, case 2 falls through to case 3: pull(read, ref[0], ref[1], undefined)
    // where undefined as a stream argument causes different behavior
    const read = pipeline(source)

    // Collect results by reading manually
    read(null, (end: any, data: any) => {
      if (end) {
        // Should have gotten one value: 5 * 2 + 100 = 110
        expect(collected).toEqual([110])
        // Both transforms should have been called exactly once
        expect(calls).toEqual(['double', 'addHundred'])
        done()
        return
      }
      collected.push(data)
      // Read until end
      read(null, (end2: any) => {
        expect(end2).toBeTruthy()
        expect(collected).toEqual([110])
        expect(calls).toEqual(['double', 'addHundred'])
        done()
      })
    })
  })
})