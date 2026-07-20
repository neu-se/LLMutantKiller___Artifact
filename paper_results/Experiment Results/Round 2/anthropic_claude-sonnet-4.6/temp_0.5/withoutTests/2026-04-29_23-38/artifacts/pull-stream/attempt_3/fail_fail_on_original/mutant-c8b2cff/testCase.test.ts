import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink abort behavior", () => {
  it("passes abort error to read when abort is set to Error before op returns false", (done) => {
    const abortError = new Error("abort!");
    let sinkRef: any;
    let pendingCb: ((end: any, data?: any) => void) | null = null;
    let sourceCallCount = 0;

    const source = (end: any, cb: (end: any, data?: any) => void) => {
      sourceCallCount++;
      if (end) {
        cb(end, null);
        return;
      }
      // Store callback to fire later
      pendingCb = cb;
    };

    const op = () => false;

    const doneCallback = (err: any) => {
      expect(err).toBe(abortError);
      done();
    };

    sinkRef = drain(op, doneCallback);
    sinkRef(source);
    
    // source was called with null, pendingCb is set
    // Now set abort to abortError - but this will ALSO call read(abortError, noop)
    // which will call source(abortError, noop), which calls noop(abortError, null)
    // That's fine - noop does nothing
    // Then fire pendingCb with data
    // op returns false, abort is abortError
    // else-if: read(abortError, done) [original] or read(true, done) [mutated]
    
    // But wait: sinkRef.abort(abortError) calls read(abortError, noop)
    // source receives abortError, calls noop(abortError) - fine
    // Then we fire pendingCb(null, "data")
    // In the callback: end = null || abort(=abortError) = abortError → TRUTHY!
    // So it goes into the FIRST if branch, not else-if!
    // done(abortError) is called from the first if branch, not our placeholder
    
    // Hmm... so if abort is set, the first if catches it
  });
});