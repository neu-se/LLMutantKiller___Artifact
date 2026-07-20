import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink - op returning false", () => {
  it("should call done with null when op returns false, properly aborting the stream", (done) => {
    // Create a simple source that produces values 1, 2, 3, ...
    let i = 0;
    const values = [1, 2, 3, 4, 5];
    
    function source(end: any, cb: (end: any, data?: any) => void) {
      if (end) {
        // When the stream is aborted, call cb with end signal
        // In original: read(true, ...) is called, so end === true
        // In mutated: read(undefined, ...) is called, so end is falsy - stream won't terminate
        cb(end);
        return;
      }
      if (i >= values.length) {
        cb(true);
        return;
      }
      cb(null, values[i++]);
    }
    
    // op returns false on the second item to stop reading
    let callCount = 0;
    const op = (data: any) => {
      callCount++;
      if (callCount >= 2) {
        return false; // Signal to stop
      }
      return true;
    };
    
    const sink = drain(op, (err: any) => {
      // done should be called with null (no error)
      expect(err).toBeNull();
      done();
    });
    
    sink(source);
    
    // If done is never called (mutated code fails to abort), the test will timeout
  });
});