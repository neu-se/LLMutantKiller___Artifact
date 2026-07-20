import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should not call sink on Number prototype when passing a number", () => {
    function source(end: any, cb: Function) { cb(true) }
    
    const sinkSpy = jest.fn()
    ;(Number.prototype as any).sink = sinkSpy
    ;(Number.prototype as any).source = function(end: any, cb: Function) { cb(true) }
    
    try {
      (pull as any)(source, 42)
      
      // Original: else-if skipped, sink never called
      // Mutated: else-if entered, (42).sink(read) called via Number.prototype.sink
      expect(sinkSpy).not.toHaveBeenCalled()
    } finally {
      delete (Number.prototype as any).sink
      delete (Number.prototype as any).source
    }
  })
})