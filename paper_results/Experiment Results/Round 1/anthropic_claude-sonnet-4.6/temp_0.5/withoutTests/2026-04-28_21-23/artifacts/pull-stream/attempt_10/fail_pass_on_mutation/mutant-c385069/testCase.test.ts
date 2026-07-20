import asyncMap from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js";

describe("asyncMap", () => {
  it("abort callback is invoked when not busy and source delivers data before responding to abort", (done) => {
    let pendingDataCb: Function | null = null;
    let pendingAbortCb: Function | null = null;

    const source = (abort: any, cb: Function) => {
      if (abort) {
        pendingAbortCb = cb;
      } else {
        pendingDataCb = cb;
      }
    };

    const mapper = (data: any, cb: Function) => {
      // Don't call cb - keep busy=true
    };

    const through = asyncMap(mapper)(source);

    // Start data read
    through(null, () => {});

    // Abort while not busy
    const abortErr = new Error("abort");
    through(abortErr, (err: any) => {
      expect(err).toBe(abortErr);
      done();
    });

    // Source delivers data (busy=true)
    if (pendingDataCb) pendingDataCb(null, 42);

    // Source responds to abort (busy=true at this point)
    if (pendingAbortCb) pendingAbortCb(abortErr);
  });
}, 500);