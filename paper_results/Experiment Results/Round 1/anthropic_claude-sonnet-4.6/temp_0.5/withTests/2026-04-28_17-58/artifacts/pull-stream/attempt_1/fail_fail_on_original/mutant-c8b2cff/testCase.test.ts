import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain abort signal propagation", () => {
  it("should pass the specific abort error to read when op returns false and abort is set", (done) => {
    const specificError = new Error("specific abort error");
    
    // Track what abort signal the source receives
    let receivedAbortSignal: any = undefined;
    let callCount = 0;
    
    // Create a source that records the abort signal it receives
    function source(abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        receivedAbortSignal = abort;
        cb(abort);
        return;
      }
      callCount++;
      cb(null, callCount);
    }
    
    // Create a drain where op returns false on first item, and abort is pre-set
    const sink = drain(
      function op(data: any) {
        return false; // immediately signal stop
      },
      function doneCb(err: any) {
        // After drain finishes, check what abort signal was passed to read
        expect(receivedAbortSignal).toBe(specificError);
        done(err === specificError || err === null || err === true ? undefined : err);
      }
    );
    
    // Pre-set abort to specificError before connecting source
    sink.abort(specificError);
    
    // Connect source
    sink(source);
  });
});