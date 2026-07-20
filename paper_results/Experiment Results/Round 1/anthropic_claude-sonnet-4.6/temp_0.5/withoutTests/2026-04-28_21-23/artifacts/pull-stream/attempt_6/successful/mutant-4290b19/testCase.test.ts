import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull partial application", () => {
  it("should pass exactly length+1 arguments to pull.apply in the default case", () => {
    // Spy on Array.prototype.unshift to detect the length of ref
    const originalUnshift = Array.prototype.unshift
    let capturedRefLength = -1
    
    Array.prototype.unshift = function(...args: any[]) {
      capturedRefLength = this.length
      return originalUnshift.apply(this, args)
    }
    
    try {
      const through = (read: Function) => read
      const source = (end: any, cb: Function) => cb(true)
      
      // 5 throughs -> default case, ref.unshift is called
      const partial = pull(through, through, through, through, through)
      partial(source)
      
      // Original: ref = [t1,t2,t3,t4,t5] (length=5) before unshift
      // Mutated: ref = [t1,t2,t3,t4,t5,undefined] (length=6) before unshift
      expect(capturedRefLength).toBe(5)
    } finally {
      Array.prototype.unshift = originalUnshift
    }
  })
})