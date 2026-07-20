import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("should properly handle abort when called with a callback, ensuring the abort variable is set correctly for subsequent reads", (done) => {
    const calls: any[] = [];
    
    function source(end: any, cb: (end: any, data?: any) => void) {
      calls.push(end);
      if (end) {
        cb(end);
      } else {
        // async - don't call cb
      }
    }
    
    const sink = drain(null, null);
    
    // Call abort with a function BEFORE connecting source
    const abortFn = jest.fn();
    sink.abort(abortFn);
    
    // In original: abort = true
    // In mutated: abort = true (false||true)
    // Both the same - abort is true
    
    // Connect source - if(abort) return sink.abort()
    // sink.abort() with no args: abort = undefined||true = true, read(true, ()=>{})
    sink(source);
    
    // source should have been called with true
    expect(calls).toEqual([true]);
    done();
  });
});