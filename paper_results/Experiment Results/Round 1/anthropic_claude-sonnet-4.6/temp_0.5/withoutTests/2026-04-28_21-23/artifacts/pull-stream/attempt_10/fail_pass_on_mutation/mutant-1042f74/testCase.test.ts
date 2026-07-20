import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("should only make one pending read at a time for async source", (done) => {
    let pendingReads = 0;
    let maxPendingReads = 0;
    const items = [1, 2, 3];
    let idx = 0;
    const callbacks: Array<() => void> = [];

    function source(end: any, cb: (err: any, data?: any) => void) {
      if (end) { cb(end); return; }
      pendingReads++;
      maxPendingReads = Math.max(maxPendingReads, pendingReads);
      const i = idx++;
      callbacks.push(() => {
        pendingReads--;
        if (i < items.length) cb(null, items[i]);
        else cb(true);
      });
    }

    drain(
      () => {},
      (err: any) => {
        expect(maxPendingReads).toBe(1);
        expect(err).toBeNull();
        done();
      }
    )(source);

    function driveCallbacks() {
      if (callbacks.length > 0) {
        const cb = callbacks.shift()!;
        cb();
        setImmediate(driveCallbacks);
      }
    }

    setImmediate(driveCallbacks);
  });
});