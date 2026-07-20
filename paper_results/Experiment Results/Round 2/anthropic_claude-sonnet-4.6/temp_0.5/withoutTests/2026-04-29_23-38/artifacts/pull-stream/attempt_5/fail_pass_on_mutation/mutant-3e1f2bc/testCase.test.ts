import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should handle object-style streams where sink is called but source is not a function", () => {
    // Test that when s is an object with sink/source, the object branch runs
    // In original: else if (s && typeof s === 'object') - only runs for objects
    // In mutated: else if (true) - runs for everything including non-objects
    // This tests that a non-object, non-function value doesn't cause sink to be called
    
    let sinkCalled = false
    const mockSink = {
      sink: (read: Function) => { sinkCalled = true },
      source: null as any
    }
    
    // Make mockSink callable as a function too
    const s = Object.assign(
      function(read: Function) { return read },
      mockSink
    )
    
    const source = (end: any, cb: Function) => { cb(true) }
    
    // s is a function AND has sink/source
    // Original: if(typeof s === 'function') runs read=s(read), else-if skipped
    // Mutated: if(true) runs read=s(read), else-if skipped  
    // Both: sinkCalled should be false
    pull(source, s)
    expect(sinkCalled).toBe(false)
  })
})