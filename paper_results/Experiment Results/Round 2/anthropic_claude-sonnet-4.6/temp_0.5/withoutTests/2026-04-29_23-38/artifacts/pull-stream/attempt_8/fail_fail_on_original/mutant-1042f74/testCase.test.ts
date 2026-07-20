import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("correctly aborts async stream when op returns false", (done) => {
    let pendingCb: Function | null = null;
    let readCount = 0;
    let abortSeen = false;

    function source(end: any, cb: Function) {
      readCount++;
      if (end) {
        abortSeen = true;
        cb(end);
        return;
      }
      // Always async
      pendingCb = () => cb(null, readCount);
    }

    const sink = drain(
      (_data: number) => false, // always abort
      (err: any) => {
        expect(err).toBeNull();
        expect(abortSeen).toBe(true);
        expect(readCount).toBe(2); // one data read + one abort read
        done();
      }
    );

    sink(source);

    // Trigger async callback
    const cb = pendingCb!;
    pendingCb = null;
    cb();
  });
});