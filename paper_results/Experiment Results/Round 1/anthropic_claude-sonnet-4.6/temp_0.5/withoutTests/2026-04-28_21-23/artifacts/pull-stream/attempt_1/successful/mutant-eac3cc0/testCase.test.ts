import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink - op returning false", () => {
  it("should pass a truthy abort value to read when op returns false", (done) => {
    // Track what abort value is passed to read when op returns false
    let abortValueReceived: any = "NOT_SET";
    
    // Create a source that records the abort signal it receives
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end) {
        // Record what abort value we received
        abortValueReceived = end;
        cb(end);
        return;
      }
      // Provide data
      cb(null, 1);
    };

    let callCount = 0;
    // op returns false after first item, signaling drain to stop
    const op = (data: any) => {
      callCount++;
      if (callCount >= 1) {
        return false; // Signal drain to stop
      }
      return true;
    };

    const doneCallback = (err: any) => {
      // After drain completes, check what abort value was sent to read
      // Original: abort || true = true (truthy)
      // Mutated: abort && true = undefined (falsy)
      expect(abortValueReceived).toBeTruthy();
      expect(abortValueReceived).toBe(true);
      done();
    };

    const sink = drain(op, doneCallback);
    sink(source);
  });
});