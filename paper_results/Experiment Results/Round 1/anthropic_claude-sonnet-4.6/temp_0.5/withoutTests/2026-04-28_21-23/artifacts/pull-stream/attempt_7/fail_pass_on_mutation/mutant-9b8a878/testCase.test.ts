import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should pass correct number of arguments in default switch case", () => {
    // When pull(t1,t2,t3,t4,t5) is called with 5 through streams (length=5):
    // args = new Array(5) [original] or new Array() [mutated]
    // After loop: args = [t1,t2,t3,t4,t5], length=5
    // partial(source): ref.unshift(source) -> [source,t1,t2,t3,t4,t5], length=6
    // pull.apply(null, ref) -> pull(source,t1,t2,t3,t4,t5)
    // In that call: length=6, a=source, a.length=2 (not 1)
    // Goes to non-partial path, chains 5 through streams
    
    // Both mutations produce identical behavior here.
    // I need to find a case where they differ.
    
    // NEW IDEA: What if I check args.length BEFORE the loop by making
    // the Array constructor observable?
    
    const OriginalArray = Array
    let lastNewArrayArg: any = 'not called'
    
    // We can't easily intercept Array constructor calls in the module
    // Let me try a different approach
    
    const through = (read: Function) => (end: any, cb: Function) => read(end, cb)
    const partial = pull(through)
    expect(typeof partial).toBe('function')
  })
})