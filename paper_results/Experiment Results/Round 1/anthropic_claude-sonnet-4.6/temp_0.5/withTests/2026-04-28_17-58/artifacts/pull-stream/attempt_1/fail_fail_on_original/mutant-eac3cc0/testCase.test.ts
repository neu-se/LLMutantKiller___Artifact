import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain abort when op returns false", () => {
  it("should call done callback when op returns false, properly aborting the source", (done) => {
    // Track how many times the source was called with an abort signal
    const readCalls: Array<{ abort: any }> = [];
    let callCount = 0;

    // A synchronous source that produces values indefinitely
    function infiniteSource(abort: any, cb: (end: any, data?: any) => void) {
      readCalls.push({ abort });
      if (abort) {
        cb(abort);
        return;
      }
      cb(null, callCount++);
    }

    // op returns false after first item, signaling drain to stop
    const sink = drain(
      (data: any) => {
        if (data >= 0) return false; // stop after first item
      },
      (err: any) => {
        // done should be called with null (no error)
        expect(err).toBeNull();
        
        // Verify that the source was called with a truthy abort signal
        // In the original code: read(abort || true, ...) -> read(true, ...)
        // In the mutated code: read(abort && true, ...) -> read(false, ...)
        // So the source should have received a truthy abort at some point after op returned false
        const abortCall = readCalls.find(c => c.abort);
        expect(abortCall).toBeDefined();
        expect(abortCall!.abort).toBeTruthy();
        
        done();
      }
    );

    sink(infiniteSource);
  });
});