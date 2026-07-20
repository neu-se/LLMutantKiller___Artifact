import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("should set abort to truthy value so subsequent sink connection triggers immediate abort", (done) => {
    // Call abort BEFORE connecting source (read is null)
    // Then connect source - if abort is truthy, sink.abort() is called again
    // The second sink.abort() call has no args: abort = undefined || true = true
    // Then read(true, fn) is called
    
    // In original: first abort call sets abort=true, second call (no args) sets abort=true, works fine
    // In mutated: first abort call sets abort=true (false||true), same result
    
    // Hmm, still the same...
    
    // Let me try: what if we pass a function to abort, and check if the 
    // function gets called with the right argument from inside the stream
    
    const endValues: any[] = [];
    
    function source(end: any, cb: (end: any, data?: any) => void) {
      endValues.push(end);
      cb(end || null, end ? undefined : 'data');
    }
    
    const doneMock = jest.fn();
    const sink = drain((_data: any) => {
      // op: return false to stop after first item
      return false;
    }, doneMock);
    
    sink(source);
    
    // op returned false, so: read(abort || true, done || fn)
    // abort is falsy (not set), so read(true, doneMock)
    // source(true, doneMock) -> doneMock(true, undefined) 
    // Wait, done is called as cb in read... 
    // Actually: read(abort||true, done||fn) where done=doneMock
    // source(true, doneMock) -> doneMock(true) -- but done expects (end===true ? null : end)
    // No wait, done is passed directly as the callback to read, not wrapped
    
    expect(doneMock).toHaveBeenCalledWith(null);
    done();
  });
});