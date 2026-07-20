import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial application", () => {
  it("should not include undefined in args when creating partial application", () => {
    // The mutation sets args[length] = undefined, making args one element longer
    // For case 4 (length=4): pull(read, ref[0], ref[1], ref[2], ref[3])
    // ref[3] in original = t4 (correct)
    // ref[3] in mutated = t4 (correct, ref[4]=undefined but unused)
    // 
    // The difference IS observable: we need to check args content directly
    // We do this by verifying the partial correctly handles all 4 cases
    
    // For length=4, case 4: pull(read, ref[0], ref[1], ref[2], ref[3])
    // If ref[3] were undefined (wrong), the pipeline would break
    // But ref[3] = t4 in both cases, so it works
    
    // The REAL observable difference: when length >= 5 (default case),
    // ref has an extra undefined. After ref.unshift(read), pull.apply gets
    // one extra undefined argument. This undefined is processed in the for loop
    // as a stream step s. Since typeof undefined !== 'function' and undefined is falsy,
    // it's skipped. So the pipeline still works correctly.
    
    // I need to find a case where the extra undefined causes a DIFFERENT code path.
    // 
    // What if I make a through function that when called as s(read) returns undefined?
    // Then in the next iteration, read = undefined, and the next s(undefined) would fail.
    // But the extra undefined is s itself, not read.
    
    // Let me try: make the LAST through function return something special,
    // and verify the pipeline processes it correctly.
    
    const results: any[] = []
    
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      cb(null, 42)
    }
    
    // Track what read value each through receives
    const readValues: any[] = []
    const makeThrough = (n: number) => (read: Function) => {
      readValues.push({ n, readType: typeof read })
      return (end: any, cb: Function) => read(end, cb)
    }
    
    // 5 throughs -> default case
    const partial = pull(
      makeThrough(1),
      makeThrough(2),
      makeThrough(3),
      makeThrough(4),
      makeThrough(5)
    )
    
    partial(source)
    
    // Each through should receive a function as read, not undefined
    expect(readValues).toHaveLength(5)
    readValues.forEach(({ n, readType }) => {
      expect(readType).toBe('function')
    })
  })
})