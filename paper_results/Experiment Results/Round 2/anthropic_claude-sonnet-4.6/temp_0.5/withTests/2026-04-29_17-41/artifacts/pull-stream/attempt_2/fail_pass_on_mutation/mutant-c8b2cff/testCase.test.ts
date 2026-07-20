import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain", () => {
  it("passes the custom abort error to the source when abort is set during async read", (done) => {
    const customError = new Error("custom abort error");
    const readAbortValues: any[] = [];
    let pendingCb: ((end: any, data?: any) => void) | null = null;

    function source(abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        readAbortValues.push(abort);
        cb(abort);
        return;
      }
      // Hold the callback to simulate async, allowing abort to be set
      pendingCb = cb;
    }

    const sink = drain(
      (_data: any) => true,
      (_err: any) => {
        expect(readAbortValues.length).toBeGreaterThan(0);
        expect(readAbortValues[0]).toBe(customError);
        done();
      }
    );

    sink(source);

    // Now abort with custom error while the read is pending
    sink.abort(customError);

    // Resume the pending read - this will trigger the else-if with abort set
    if (pendingCb) {
      pendingCb(null, 1);
    }
  });
});