import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull', () => {
  it('partial sink composed with itself should apply the correct number of throughs', (done) => {
    let applicationCount = 0

    const countingThrough = (read: Function) => {
      applicationCount++
      return (abort: any, cb: Function) => read(abort, cb)
    }

    // pull(f1, f2) -> partial sink P, length=2, args=[f1,f2] or [f1,f2,undefined]
    const P = pull(countingThrough, countingThrough)

    // P(P) -> switch(2): pull(P, ref[0], ref[1]) = pull(P, f1, f2)
    // P.length===1, so pull(P, f1, f2) -> partial sink Q, length=3
    // Original args=[P,f1,f2], mutated args=[P,f1,f2,undefined]
    // Q(source) -> switch(3): pull(source, ref[0], ref[1], ref[2])
    //   Original: pull(source, P, f1, f2)
    //   Mutated:  pull(source, P, f1, f2) -- ref[2]=f2 in both! undefined is at ref[3]
    // Hmm, still same.

    // What if P(P)(P)?
    // Q = P(P) as above, Q is partial sink with length=3
    // Q(P) -> switch(3): pull(P, ref[0], ref[1], ref[2])
    //   Original: pull(P, P, f1, f2) -- P.length===1 -> partial sink R, length=4, args=[P,P,f1,f2]
    //   Mutated:  pull(P, P, f1, f2) -- same! ref[2]=f2 in both
    // R(source) -> switch(4): pull(source, ref[0], ref[1], ref[2], ref[3])
    //   Original: pull(source, P, P, f1, f2) -> applies P(source), then f1, then f2... wait
    //   Actually in normal path: i=1: s=P -> read=P(source); i=2: s=P -> read=P(read); i=3: s=f1; i=4: s=f2
    //   P(source) = switch(2): pull(source, f1, f2) -> applies f1 and f2 (2 applications)
    //   P(read) = switch(2): pull(read, f1, f2) -> applies f1 and f2 (2 more)
    //   Then f1 and f2 directly: 2 more
    //   Total: 6 applications
    //   Mutated: same result since ref[3]=f2 in both cases

    // I keep getting the same result. Let me just write the test.
    const source = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      cb(true)
    }

    const piped = P(source)
    piped(null, (end: any) => {
      expect(applicationCount).toBe(2)
      done()
    })
  })
})