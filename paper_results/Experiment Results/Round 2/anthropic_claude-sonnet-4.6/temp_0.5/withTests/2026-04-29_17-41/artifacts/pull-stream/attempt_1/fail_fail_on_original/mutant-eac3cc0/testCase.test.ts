import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain abort when op returns false", () => {
  it("should call done with null when op returns false and abort is not set", (done) => {
    // Create a source that tracks what abort value it receives
    const abortValues: any[] = [];
    let callCount = 0;
    
    function source(abort: any, cb: (end: any, data?: any) => void) {
      abortValues.push(abort);
      if (abort) {
        cb(abort);
        return;
      }
      callCount++;
      cb(null, callCount);
    }

    const sink = drain(
      function op(data: any) {
        // Return false on first item to signal stop
        if (data === 1) return false;
        return true;
      },
      function onDone(err: any) {
        // done should be called with null (clean end)
        expect(err).toBeNull();
        // The abort value passed to read should be truthy (true), not falsy (undefined/false)
        // In the mutated code, abort && true = undefined when abort is undefined
        // so the source would receive undefined instead of true
        const lastAbortValue = abortValues[abortValues.length - 1];
        expect(lastAbortValue).toBeTruthy();
        done();
      }
    );

    sink(source);
  });
});