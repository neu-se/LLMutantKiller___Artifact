import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("should set abort to the error object when aborted with an error", (done) => {
    const abortError = new Error("test abort");
    let capturedEnd: any = null;
    
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end) {
        capturedEnd = end;
        cb(end);
        return;
      }
      // hang - never call cb
    };

    const sink = drain(
      (data: any) => {},
      (err: any) => {
        // The error passed to done should be the abort error
        expect(err).toBe(abortError);
        done();
      }
    );

    sink(source);
    sink.abort(abortError);
  });
});