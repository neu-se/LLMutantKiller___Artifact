import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink abort behavior", () => {
  it("should pass the abort error to done when abort is an Error object", (done) => {
    const abortError = new Error("abort error");
    
    // Create a source that provides data
    let callCount = 0;
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end) {
        cb(end, null);
        return;
      }
      callCount++;
      if (callCount === 1) {
        cb(null, "data1");
      } else {
        cb(true, null);
      }
    };

    // op that returns false on first call, triggering the abort path
    const op = (data: any) => {
      return false; // Always return false to trigger the read(abort || true, ...) path
    };

    const doneCallback = (err: any) => {
      // In original: if abort is set, read(abort || true, done) is called
      // The source receives the abort error and calls done with it
      // In mutated: read(true, done) is called, source receives true and calls done with null (true === true)
      // We need to verify the behavior difference
      
      // With abort set to abortError, original passes abortError to read
      // The source would call cb(abortError), and done would be called with abortError
      // With mutation, read(true) is called, source calls cb(true), done gets null (true === true means end)
      expect(err).toBe(abortError);
      done();
    };

    const sink = drain(op, doneCallback);
    
    // Set abort before connecting
    sink.abort(abortError);
    
    // Connect source
    sink(source);
  });
});