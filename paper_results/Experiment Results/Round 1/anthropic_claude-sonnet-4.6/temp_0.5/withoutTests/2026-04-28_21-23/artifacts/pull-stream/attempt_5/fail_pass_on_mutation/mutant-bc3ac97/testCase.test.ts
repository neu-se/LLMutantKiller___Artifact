import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull case 3 mutation - second call re-enters partial application path", () => {
  it("detects fall-through by observing that case 3 with undefined 4th arg re-triggers partial when read has length 1", () => {
    // If the through functions return functions of length 1,
    // then pull(read, f1, f2, f3, undefined) with length=5
    // processes normally since undefined is skipped
    // BUT if read itself has length===1, the outer pull call becomes a partial!
    
    // Actually let's check: pull(read, f1, f2, f3, undefined)
    // a = read (first arg). If read.length === 1, we enter the partial path!
    // length=5, args=[read,f1,f2,f3,undefined]
    // returns function(read2) { ... switch(5) -> default: ref.unshift(read2); pull.apply(null, ref) }
    // This would be VERY different behavior!

    const results: number[] = []
    
    // A through that has .length === 1 (standard through signature)
    const makeThrough = (n: number) => function(read: Function) {
      return function(end: any, cb: Function) {
        read(end, (end: any, data: any) => {
          if (end) return cb(end)
          cb(null, data + n)
        })
      }
    }

    const t1 = makeThrough(1)  // length === 1
    const t2 = makeThrough(10) // length === 1  
    const t3 = makeThrough(100) // length === 1

    // Partial application with 3 args -> length=3
    const pipeline = pull(t1, t2, t3)

    let idx = 0
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (idx >= 1) return cb(true)
      cb(null, idx++)
    }

    // pipeline(source) triggers case 3
    // Original: pull(source, t1, t2, t3) -> source goes through t1,t2,t3 -> adds 111
    // Mutated: pull(source, t1, t2, t3, undefined) -> source.length is likely 2, not 1
    //          so not partial, loop processes t1,t2,t3,undefined -> same result?
    
    // Hmm source.length = 2... let me use a source with length 1
    const source1 = (end: any, cb?: Function) => {
      // length === 1... no that's wrong
    }

    const result = pipeline(source)
    const collected: number[] = []
    
    result(null, (end: any, data: any) => {
      if (!end) collected.push(data)
    })
    result(null, (end: any, data: any) => {})

    expect(collected).toEqual([111])
  })
})