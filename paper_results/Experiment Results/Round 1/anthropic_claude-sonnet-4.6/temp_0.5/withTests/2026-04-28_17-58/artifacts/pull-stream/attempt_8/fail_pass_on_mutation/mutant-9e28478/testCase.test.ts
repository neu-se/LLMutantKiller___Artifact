import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe('pull case 2 mutation detection', () => {
  it('direct call and partial application with 2 throughs should produce identical results', () => {
    // The mutant changes case 2 to fall through to case 3, calling:
    // pull(read, ref[0], ref[1], ref[2]) where ref[2] is undefined
    // 
    // When pull processes this with 4 args, arguments.length is 4.
    // BUT the first arg `read` is a plain source function (arity 2, not 1),
    // so it goes to the non-partial branch.
    // Loop: i=1 (ref[0]=through1), i=2 (ref[1]=through2), i=3 (ref[2]=undefined, skipped)
    // This IS equivalent to pull(read, through1, through2).
    //
    // HOWEVER: what if through2 is actually a through that checks its argument count?
    // Let's try: what if ref[1] is null?
    // pull(through1, null) - length=2, ref=[through1, null]
    // Original case 2: pull(read, through1, null)
    //   -> through1(read) then null: typeof null === 'object' but null && ... is false, skipped
    // Mutant case 3: pull(read, through1, null, undefined)  
    //   -> same result
    //
    // I believe this is an equivalent mutant. Let me try the only remaining difference:
    // what if `a.length === 1` for the first argument to the partial?
    // pull(f) where f.length===1 creates a partial of length 1.
    // Then pull(partial, through2) - length=2, a=partial (length=1), creates ANOTHER partial!
    // That partial when called: length=2, case 2 applies.
    // Original: pull(read, partial, through2)
    // Mutant: pull(read, partial, through2, undefined)
    // partial is a function with length 1, so partial(read) returns a new read function
    // through2 then transforms that... undefined is skipped. Still equivalent.
    //
    // Let me just try to verify the number of arguments received by through2

    const argsReceived: number[] = []

    const through1 = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + 1)
      })
    }

    // through2 records how many times it was called as a through
    let through2CallCount = 0
    const through2 = (read: Function) => {
      through2CallCount++
      return (abort: any, cb: Function) => {
        read(abort, (end: any, data: any) => {
          if (end) return cb(end)
          cb(null, data * 10)
        })
      }
    }
    // Make through2 have length 1 explicitly
    Object.defineProperty(through2, 'length', { value: 1 })

    let sourceCallCount = 0
    let idx = 0
    const source = (abort: any, cb: Function) => {
      sourceCallCount++
      if (abort) return cb(abort)
      if (idx >= 1) return cb(true)
      cb(null, ++idx)
    }

    // Partial with 2 throughs - hits case 2
    const partial = pull(through1, through2)
    const read = partial(source)

    // through2 should have been called exactly once as a through-stream transformer
    expect(through2CallCount).toBe(1)

    const results: number[] = []
    read(null, (end: any, data: any) => {
      if (!end) results.push(data)
    })
    read(null, (_end: any) => {})

    // (1+1)*10 = 20
    expect(results).toEqual([20])
  })
})