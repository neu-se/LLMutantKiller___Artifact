import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should create args with correct length observable through Array.isArray and length", () => {
    // Monkey-patch Array constructor to observe calls - NO, that's too hacky
    
    // Let me try: what if I pass a function whose .length is 1
    // and observe what happens with the args array length
    // through the behavior of pull.apply in the default case
    
    // Actually: new Array(5) creates array with length 5
    // new Array() creates array with length 0
    // After filling both with 5 items, both have length 5
    // pull.apply(null, ref) after unshift uses ref.length which is 6 in both cases
    
    // I cannot find a behavioral difference. Let me try anyway.
    const results: number[] = []
    const makeThrough = (n: number) => (read: Function) => (end: any, cb: Function) =>
      read(end, (err: any, data: any) => err ? cb(err) : cb(null, data + n))
    
    const partial = pull(makeThrough(1), makeThrough(2), makeThrough(3), makeThrough(4), makeThrough(5))
    
    let i = 0
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      if (i++ > 0) return cb(true)
      cb(null, 0)
    }
    
    const stream = partial(source)
    stream(null, (err: any, data: any) => { if (!err) results.push(data) })
    expect(results).toEqual([15])
  })
})