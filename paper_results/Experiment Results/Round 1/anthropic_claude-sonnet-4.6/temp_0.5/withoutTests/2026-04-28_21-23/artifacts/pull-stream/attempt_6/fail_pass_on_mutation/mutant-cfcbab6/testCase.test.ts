import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should not access beyond arguments length causing undefined stream processing", () => {
    // Test that with exactly 1 through stream, it gets applied
    // The mutation i<=length vs i<length matters when length=2 (source + 1 other)
    // If inner loop runs i=1,2 instead of i=1, last s=undefined
    
    let throughApplied = false
    
    const source = (end: any, cb: Function) => {
      if (end) return cb(end)
      cb(null, 1)
    }
    
    const through = (read: Function) => {
      throughApplied = true
      return (end: any, cb: Function) => read(end, cb)
    }
    
    // Use apply to be explicit about argument count
    const result = pull.apply(null, [source, through])
    
    // Pull with source + through (no sink) should return the piped stream
    // Original: through(source) called, throughApplied=true, returns through's read fn
    // Mutated: s=undefined after extra iteration, through never applied
    expect(throughApplied).toBe(true)
  })
})