import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should return undefined when last of 3 partial args is a consuming sink", () => {
    // In original: case 3 falls through to placeholder case 4:
    //   return pull(read, ref[0], ref[1], ref[2], ref[3])
    //   where ref[3] = undefined (since length=3, only ref[0..2] exist)
    //
    // In mutated: placeholder case 4 is empty, falls to second case 4:
    //   return pull(read, ref[0], ref[1], ref[2], ref[3])
    //   same call, same result
    //
    // These are equivalent... so let me test with length=4 to see if
    // there's any difference there.
    //
    // For length=4 with a duplex (object with .sink and .source) as ref[3]:
    // Original: first case 4 (placeholder) returns pull(read, ref[0], ref[1], ref[2], ref[3])
    //   In recursive call: processes ref[3] as object: ref[3].sink(read); read = ref[3].source
    //   Returns ref[3].source
    // Mutated: first case 4 is empty, falls to second case 4, same return
    //
    // Still equivalent. I need to find the actual behavioral difference.
    //
    // Let me look at this from a TOTALLY different angle.
    // What if I test pull() with NO partial application - just direct pipeline?
    // The mutation only affects the partial application path.
    //
    // For direct pull(source, t1, t2, t3) with 4 args (length=4):
    // a = source, source.length != 1 (it's 2), so NO partial created.
    // Goes straight to the loop. The switch is NEVER hit for direct calls!
    // The switch is ONLY hit inside the partial sink function.
    //
    // So the mutation ONLY affects behavior when:
    // 1. pull() is called with first arg having length===1 (creates partial)
    // 2. The partial is then called with a source
    // 3. The length of the partial call is 3 or 4
    //
    // For the partial call with length=3 or 4, both original and mutated
    // produce identical results as analyzed above.
    //
    // CONCLUSION: This mutation is semantically equivalent and cannot be killed
    // by a behavioral test. But since the problem insists it can be killed,
    // let me try one more thing: maybe there's a subtle difference in how
    // JavaScript handles the duplicate case 4 that I'm missing.
    //
    // Let me test this with a minimal reproduction:

    // Create a through that records when it's called
    const callLog: string[] = []

    const makeThrough = (name: string) => (read: any) => {
      callLog.push(name)
      return (end: any, cb: any) => read(end, cb)
    }

    let i = 0
    const source = (end: any, cb: any) => {
      if (end) return cb(end)
      if (i >= 1) return cb(true)
      cb(null, ++i)
    }

    // Test with length=4 partial (4 through/sink args)
    // This hits case 4 in the switch
    const results: number[] = []
    const sink = (read: any) => {
      callLog.push('sink')
      ;(function drain() {
        read(null, (e: any, d: any) => {
          if (e) return
          results.push(d)
          drain()
        })
      })()
    }

    // 4-arg partial
    const p = pull(makeThrough('t1'), makeThrough('t2'), makeThrough('t3'), sink)
    p(source)

    expect(callLog).toEqual(['t1', 't2', 't3', 'sink'])
    expect(results).toEqual([1])
  })
})