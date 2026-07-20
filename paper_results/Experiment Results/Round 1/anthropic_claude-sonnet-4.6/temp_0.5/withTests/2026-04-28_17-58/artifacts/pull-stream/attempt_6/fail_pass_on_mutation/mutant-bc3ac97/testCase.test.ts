import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull case 2 mutation", () => {
  it("nested pipeline factories work correctly", (done) => {
    // f1 and f2 are through functions (length=1)
    const f1 = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data + 1)
      })
    }
    
    const f2 = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end)
        cb(null, data * 2)
      })
    }
    
    // pipeline1 is a length-1 function
    const pipeline1 = pull(f1, f2)
    
    // Now create a pipeline with pipeline1 as first arg
    // This triggers: pull(pipeline1, f1) where pipeline1.length === 1
    // → pipeline path, args=[pipeline1, f1], length=2
    const pipeline2 = pull(pipeline1, f1)
    
    // pipeline2 is a length-1 function
    // When called with a real source:
    // switch(2): original: pull(src, pipeline1, f1)
    //   → pipeline1.length===1 → pipeline path? No! a=src, not pipeline1
    //   → non-pipeline (src.length=2)
    //   → i=1: read = pipeline1(src) → calls pipeline1's inner fn with src
    //     → switch(2) original: pull(src, f1, f2) → f2(f1(src))
    //     → switch(2) mutated: pull(src, f1, f2, undefined) → f2(f1(src)) (same)
    //   → i=2: read = f1(read)
    //   → return f1(f2(f1(src)))
    
    // Both versions give same result. Still equivalent!
    
    let idx = 0
    const src = (abort: any, cb: Function) => {
      if (abort) return cb(abort)
      if (idx >= 2) return cb(true)
      cb(null, ++idx)
    }
    
    const read = pipeline2(src)
    const results: number[] = []
    const drain = () => {
      read(null, (end: any, data: any) => {
        if (end === true) {
          // src: [1, 2]
          // pipeline1: f1 then f2: (1+1)*2=4, (2+1)*2=6
          // then f1: 4+1=5, 6+1=7
          expect(results).toEqual([5, 7])
          done()
          return
        }
        if (end) { done(end); return }
        results.push(data)
        drain()
      })
    }
    drain()
  })
})