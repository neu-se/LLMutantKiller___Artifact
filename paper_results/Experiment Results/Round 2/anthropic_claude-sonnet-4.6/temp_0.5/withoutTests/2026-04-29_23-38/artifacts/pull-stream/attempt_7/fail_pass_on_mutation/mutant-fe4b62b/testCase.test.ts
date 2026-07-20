import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("should invoke the abort callback when sink.abort is called with a callback", (done) => {
    let readCb: ((end: any, data?: any) => void) | null = null;

    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end) {
        cb(end);
        return;
      }
      readCb = cb;
    };

    const sink = drain(
      (data: any) => {},
      (err: any) => {}
    );

    sink(source);

    // Call abort with a specific callback
    const abortCb = jest.fn();
    sink.abort(null, abortCb);

    // Simulate source responding to abort
    if (readCb) {
      readCb(true);
    }

    expect(abortCb).toHaveBeenCalled();
    done();
  });
});