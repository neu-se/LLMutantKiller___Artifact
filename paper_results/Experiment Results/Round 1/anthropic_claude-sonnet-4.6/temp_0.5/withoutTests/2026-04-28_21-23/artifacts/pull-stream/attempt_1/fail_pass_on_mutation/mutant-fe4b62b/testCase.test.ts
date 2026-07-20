import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort with callback as first argument", () => {
  it("should pass truthy abort signal to read when abort is called with only a callback", (done) => {
    // Create a source that tracks what end values it receives
    const receivedEndValues: any[] = [];
    
    let readCallback: ((end: any, data?: any) => void) | null = null;
    
    // A source that captures the read callback so we can control it
    function source(end: any, cb: (end: any, data?: any) => void) {
      receivedEndValues.push(end);
      readCallback = cb;
      
      if (end) {
        // Stream is being aborted/ended
        cb(end);
        return;
      }
      
      // Don't call cb immediately - let the test control it
    }
    
    const sink = drain(null, null);
    sink(source);
    
    // At this point, source was called with (null, cb) - first read
    // readCallback is set, receivedEndValues = [null]
    
    // Now call abort with just a callback (no error)
    // In original: cb = callback, err = true -> abort = true -> read(true, callback)
    // In mutated: cb = callback, err = false -> abort = false -> read(false, callback)
    const abortCallback = jest.fn();
    sink.abort(abortCallback);
    
    // The source should have been called with the abort signal
    // In original: receivedEndValues should contain true (truthy abort)
    // In mutated: receivedEndValues should contain false (falsy - not a real abort)
    
    // Check that the abort signal passed to read is truthy
    const lastEndValue = receivedEndValues[receivedEndValues.length - 1];
    expect(lastEndValue).toBeTruthy();
    
    done();
  });
});