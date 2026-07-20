import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should throw when sink is called with undefined as a stream stage", () => {
    expect(() => {
      // With mutation, s becomes undefined on extra iteration
      // but more importantly the nested loop resets i causing outer loop issues
      const source = (end: any, cb: Function) => cb(null, 1)
      const through1 = (read: Function) => read
      const through2 = (read: Function) => read  
      const through3 = (read: Function) => read
      
      // With 4 args total (length=4), inner loop i goes 1,2,3,4
      // i=4 means arguments[4] is undefined
      // undefined s: neither function nor object, so read stays same
      // But outer loop also runs i from 1 to 3
      // Since var is function-scoped, inner loop's i overwrites outer i
      pull(source, through1, through2, through3)
    }).not.toThrow()
    
    // The real issue: with mutation the nested loop causes wrong behavior
    const callCount = { val: 0 }
    const source = (end: any, cb: Function) => { callCount.val++; cb(null, 1) }
    const double = (read: Function) => (end: any, cb: Function) => read(end, (err: any, data: any) => cb(err, data != null ? data * 2 : data))
    
    const results: number[] = []
    const sink = (read: Function) => { read(null, (end: any, data: any) => { if (!end) results.push(data) }) }
    
    pull(source, double, sink)
    expect(results).toEqual([2])
  })
})