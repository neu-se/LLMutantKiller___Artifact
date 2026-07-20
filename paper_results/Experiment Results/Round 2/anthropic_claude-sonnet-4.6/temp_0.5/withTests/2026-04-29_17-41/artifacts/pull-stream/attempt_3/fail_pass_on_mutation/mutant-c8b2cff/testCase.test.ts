import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain", () => {
  it("passes custom abort error to done callback when abort is set during async read", (done) => {
    const customError = new Error("custom abort error");
    let pendingCb: ((end: any, data?: any) => void) | null = null;

    function source(abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        cb(abort);
        return;
      }
      pendingCb = cb;
    }

    const sink = drain(
      (_data: any) => true,
      (err: any) => {
        // Original: done receives customError (not null, not true)
        // Mutated: done receives null (because source gets true, end===true -> null)
        expect(err).toBe(customError);
        done();
      }
    );

    sink(source);

    // Abort with custom error while read is pending
    sink.abort(customError);

    // Deliver data - abort is now set, triggering the else-if branch
    const cb = pendingCb;
    pendingCb = null;
    if (cb) cb(null, 1);
  });
});