import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort with callback as first argument", () => {
  it("should terminate the stream with a truthy end signal when abort is called with only a callback", (done) => {
    let callCount = 0;
    const endSignals: any[] = [];
    
    // Source that records the end signals it receives
    // When called with a falsy end signal, it returns data (stream continues)
    // When called with a truthy end signal, it terminates
    function source(end: any, cb: (end: any, data?: any) => void) {
      callCount++;
      endSignals.push(end);
      
      if (end) {
        // Truthy end: stream is being aborted/ended properly
        cb(end);
      } else {
        // Falsy end (null or false): source treats this as a data request
        // Return some data to keep stream going
        cb(null, 'data');
      }
    }
    
    // Use an op that never returns false, so stream keeps going
    const sink = drain((_data: any) => { /* keep going */ }, (err: any) => {
      // done callback - check what happened
      // In original: abort=true, so done(null) is called (true === true means null)
      // In mutated: abort=false, stream may not terminate properly
    });
    
    sink(source);
    
    // After sink(source), the while loop runs synchronously since source calls cb immediately
    // The stream will keep looping since op never returns false
    // But we need to abort it
    
    const abortCb = jest.fn();
    sink.abort(abortCb);
    
    // In original: abort=true -> read(true, abortCb) -> source gets end=true -> cb(true) -> abortCb called
    // In mutated: abort=false -> read(false, abortCb) -> source gets end=false -> cb(null, 'data') -> abortCb NOT called with end
    
    expect(abortCb).toHaveBeenCalled();
    done();
  });
});