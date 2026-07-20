import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("should pass error to done when stream errors", () => {
    const streamError = new Error("stream error");
    let completionError: any = "not-called";

    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end) { cb(end); return; }
      cb(streamError);
    };

    drain(
      (data: any) => {},
      (err: any) => { completionError = err; }
    )(source);

    expect(completionError).toBe(streamError);
  });
});