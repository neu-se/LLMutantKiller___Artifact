import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("calls abort callback with true when sink.abort called with a callback function", (done) => {
    let pendingCb: Function | null = null;

    const source = (abort: any, cb: Function) => {
      if (abort) {
        if (pendingCb) {
          const p = pendingCb;
          pendingCb = null;
          p(abort);
        }
        cb(abort);
        return;
      }
      pendingCb = cb;
    };

    const sink = drain(() => {}, () => {});
    sink(source);

    sink.abort(function(err: any) {
      expect(err).toBe(true);
      done();
    });
  });
});