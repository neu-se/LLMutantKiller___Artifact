import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink abort behavior", () => {
  it("passes abort error value to read (not just true) when abort is an Error", (done) => {
    const abortError = new Error("abort!");
    const readArgs: any[] = [];

    let pendingCb: ((end: any, data?: any) => void) | null = null;
    
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      readArgs.push(end);
      if (end) {
        cb(end, null);
        return;
      }
      // Hold the callback to allow external control
      pendingCb = cb;
    };

    const op = () => false; // Always return false

    const doneCallback = (err: any) => {
      // Original: read(abortError, ...) -> source receives abortError -> done(abortError)
      // Mutated: read(true, ...) -> source receives true -> done(null)
      expect(err).toBe(abortError);
      done();
    };

    const sink = drain(op, doneCallback);
    sink(source);
    
    // Now pendingCb is set (source was called with null end)
    // Set abort manually - but we can't access internal abort directly
    // We need to use sink.abort but that will also call read...
    
    // Actually let's just fire the callback with data
    // op will return false, entering else-if branch
    // At that point abort is falsy, so read(false || true) = read(true) - same as mutation!
    
    // We need abort to be an Error when the else-if branch runs
    // The only way is to have abort set before op returns false
  });
});