import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("should invoke done with null when stream ends normally after abort called with only callback", (done) => {
    let sourceEndSignals: any[] = [];
    
    function source(end: any, cb: (end: any, data?: any) => void) {
      sourceEndSignals.push(end);
      if (end) {
        cb(end);
      }
      // else: async, don't call cb
    }

    const doneCb = jest.fn();
    const sink = drain(null, doneCb);
    
    // Call abort BEFORE connecting source (read is not set yet)
    const abortCb = jest.fn();
    sink.abort(abortCb);
    
    // Now connect source - since abort is set, sink should call sink.abort() immediately
    // Original: abort = true -> sink.abort() called -> but read not set... 
    // Actually: if(abort) return sink.abort() - this calls sink.abort() again with no args
    // sink.abort() with no args: err=undefined, not a function, so skip the if
    // abort = undefined || true = true
    // read is now set, so read(true, function(){})
    sink(source);
    
    // In original: abort=true (set by first abort call), sink(source) sees abort=true, calls sink.abort()
    // sink.abort() -> abort = undefined||true = true -> read(true, ()=>{}) -> source(true, cb) -> cb(true)
    // done is called with null (true===true -> null)
    
    // In mutated: abort=false (set by first abort call with function), sink(source) sees if(abort)...
    // abort=false is falsy! So if(abort) is FALSE, sink.abort() is NOT called!
    // Instead the while loop runs, source(null, cb) is called, cb is stored (async)
    // done is NOT called
    
    expect(doneCb).toHaveBeenCalledWith(null);
    done();
  });
});