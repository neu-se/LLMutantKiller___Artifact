import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink abort", () => {
  it("should abort stream and call done with null when no error", (done) => {
    let calls = 0;
    let pendingCb: ((end: any, data?: any) => void) | null = null;

    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end) {
        cb(end);
        return;
      }
      pendingCb = cb;
    };

    const sink = drain(
      (data: any) => {},
      (err: any) => {
        expect(err).toBeNull();
        done();
      }
    );

    sink(source);

    // Trigger the source to provide data, keeping the loop going
    if (pendingCb) {
      const cb = pendingCb;
      pendingCb = null;
      cb(null, 1);
    }

    // Now abort - pendingCb should be set again
    if (pendingCb) {
      sink.abort();
      const cb = pendingCb;
      pendingCb = null;
      cb(true);
    }
  });
});