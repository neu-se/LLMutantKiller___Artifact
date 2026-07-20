import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("should call the abort callback passed to sink.abort when source is already connected", (done) => {
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

    // readCb is now set (source is hanging waiting for abort)
    expect(readCb).not.toBeNull();

    // Call abort with a callback - the callback should be invoked
    sink.abort(null, () => {
      done();
    });

    // Source responds to abort
    if (readCb) {
      const cb = readCb;
      readCb = null;
      cb(true);
    }
  });
});