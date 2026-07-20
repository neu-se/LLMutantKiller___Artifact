import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("should call abort callback with true when abort is invoked with only a function before source is connected", (done) => {
    const endValues: any[] = [];
    
    // Synchronous source that immediately provides data or ends
    function source(end: any, cb: (end: any, data?: any) => void) {
      endValues.push(end);
      cb(end, end ? undefined : 'data');
    }
    
    const sink = drain(null, null);
    
    // Abort before connecting source (read not set yet)
    const abortCb = jest.fn();
    sink.abort(abortCb);
    
    // Now connect source - abort is set to true in both original and mutated
    // if(abort) return sink.abort() -> sink.abort() called with no args
    // abort = undefined||true = true, read(true, ()=>{})
    // source(true, ()=>{}) -> ()=>{}(true)
    sink(source);
    
    // abortCb was never called (read was null when first abort called)
    // source was called with true
    expect(endValues).toContain(true);
    expect(abortCb).not.toHaveBeenCalled();
    done();
  });
});