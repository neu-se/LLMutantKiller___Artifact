import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should call each through stream setup function exactly once", () => {
    let setupCount = 0
    
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      cb(null, 1)
    }
    
    const through = (read: Function) => {
      setupCount++
      return (end: any, cb: Function) => read(end, cb)
    }
    
    // With length=3 (source, through, through):
    // Original flat loop i=1,2: calls through twice → setupCount=2
    // If mutation causes extra iteration with undefined: still setupCount=2
    // 
    // But if nested loop structure: original processes args[length-1] only
    // Mutated processes args[length]=undefined only
    pull(source, through, through)
    expect(setupCount).toBe(2)
  })
})