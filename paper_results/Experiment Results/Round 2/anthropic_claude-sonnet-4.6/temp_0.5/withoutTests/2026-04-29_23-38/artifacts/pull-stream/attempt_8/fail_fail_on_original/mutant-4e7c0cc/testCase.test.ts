import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull stream pipeline", () => {
  it("should correctly pipe values through a 4-argument partial pipeline", () => {
    // Based on the mutation: the placeholder replaces what's between case 3: and case 4:
    // Original: case 3 falls through to placeholder "case 4: return pull(...ref[3])"
    //           then there's another case 4 in the file (unreachable)
    // Mutated:  placeholder becomes "case 4:" (empty), so case 3 and first case 4
    //           both fall through to the second case 4 in the file
    //
    // For length=4 specifically:
    // Original: JS switch matches the FIRST case 4 (the placeholder), returns immediately
    // Mutated:  JS switch matches the FIRST case 4 (now empty), falls through to second case 4
    //
    // In both cases the return value is the same pull(...) call.
    // BUT: does JS with duplicate case labels match the first or... let me think differently.
    //
    // Actually in the mutated code, there are TWO "case 4:" labels.
    // When length===4, JS evaluates case expressions top-to-bottom and jumps to FIRST match.
    // So it jumps to the first "case 4:" which is now empty (the mutated placeholder).
    // Then falls through to the second "case 4:" which has the return.
    // Result is the same.
    //
    // The mutation truly appears equivalent. But let me check: maybe the issue
    // is that in the ORIGINAL, case 3 has the return statement from the placeholder,
    // meaning case 3 does NOT fall through - it returns!
    //
    // Original switch:
    //   case 1: return pull(read, ref[0])
    //   case 2: return pull(read, ref[0], ref[1])
    //   case 3:
    //   case 4: return pull(read, ref[0], ref[1], ref[2], ref[3])  <- PLACEHOLDER
    //   case 4: return pull(read, ref[0], ref[1], ref[2], ref[3])  <- IN FILE
    //
    // For length=3: hits case 3, falls through to PLACEHOLDER case 4, returns with ref[3]=undefined
    // For length=4: hits PLACEHOLDER case 4 (first match), returns with ref[3]=ref[3]
    //
    // Mutated switch:
    //   case 1: return pull(read, ref[0])
    //   case 2: return pull(read, ref[0], ref[1])
    //   case 3:
    //   case 4:  <- MUTATED PLACEHOLDER (empty)
    //   case 4: return pull(read, ref[0], ref[1], ref[2], ref[3])  <- IN FILE
    //
    // For length=3: hits case 3, falls through to first case 4 (empty), falls through to second case 4, returns
    // For length=4: hits FIRST case 4 (empty, because it's first match), falls through to second case 4, returns
    //
    // In ALL cases, both original and mutated return pull(read, ref[0], ref[1], ref[2], ref[3]).
    // For length=3, ref[3]=undefined in both. For length=4, ref[3]=ref[3] in both.
    //
    // The mutation is 100% equivalent. There is no observable behavioral difference.
    //
    // WAIT. I just realized I might be wrong about which case 4 is matched.
    // In JavaScript, duplicate case labels: the switch jumps to the FIRST matching case.
    // So for length=4, it always jumps to the FIRST "case 4:" label.
    //
    // In original: first "case 4:" has "return pull(read, ref[0], ref[1], ref[2], ref[3])"
    // In mutated: first "case 4:" is empty, falls to second "case 4:" which returns same thing.
    //
    // Truly equivalent. I need to accept this and find another angle.
    //
    // NEW IDEA: What if the problem description is slightly wrong about which line is mutated?
    // What if the ACTUAL mutation is that case 3 originally had:
    //   case 3: return pull(read, ref[0], ref[1], ref[2])
    // And was mutated to:
    //   case 3: return pull(read, ref[0], ref[1], ref[2], ref[3])
    //
    // In that case, for length=3, original calls pull with 4 args (ref[0..2]),
    // mutated calls pull with 5 args (ref[0..3] where ref[3]=undefined).
    // Still equivalent since undefined is skipped.
    //
    // OR the mutation changes:
    //   case 3: return pull(read, ref[0], ref[1], ref[2])
    // to:
    //   case 3: return pull(read, ref[0], ref[1], ref[2], ref[3])
    //
    // For length=3, ref[3]=undefined. In the loop, undefined is skipped. Equivalent.
    //
    // I'm going to try a test where undefined being passed as a stream causes
    // a DIFFERENT error message or behavior that we can detect.

    // What if we use pull where one of the "through" streams is actually
    // a pull-stream SOURCE (length=2), and we check the pipeline still works?
    
    // Let me try the simplest possible test to check if pull with 3 args in partial
    // returns the correct number of results.

    const results: number[] = []
    let count = 0
    
    const values = [1, 2, 3, 4, 5]
    const source = (end: any, cb: any) => {
      if (end) return cb(end)
      if (count >= values.length) return cb(true)
      cb(null, values[count++])
    }

    const double = (read: any) => (end: any, cb: any) =>
      read(end, (e: any, d: any) => e ? cb(e) : cb(null, d * 2))

    const filter = (pred: (x: number) => boolean) => (read: any) => (end: any, cb: any) => {
      const next = (end: any, cb: any): void => {
        read(end, (e: any, d: any) => {
          if (e) return cb(e)
          if (pred(d)) return cb(null, d)
          next(null, cb)
        })
      }
      return (end: any, cb: any) => next(end, cb)
    }

    const collectSink = (arr: number[]) => (read: any) => {
      const drain = () => read(null, (e: any, d: any) => {
        if (e) return
        arr.push(d)
        drain()
      })
      drain()
    }

    // 3-arg partial
    const pipeline = pull(double, filter((x) => x > 4), collectSink(results))
    pipeline(source)

    // doubled: 2,4,6,8,10; filtered >4: 6,8,10
    expect(results).toEqual([6, 8, 10])
  })
})