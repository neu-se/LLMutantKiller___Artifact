import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('reads exactly once per item for async source', (done) => {
    let readCount = 0;
    let i = 0;
    const items = [1, 2, 3];
    const callbacks: Array<() => void> = [];

    function source(abort: any, cb: (end: any, data?: any) => void) {
      readCount++;
      if (abort) return cb(abort);
      const idx = i++;
      callbacks.push(() => {
        if (idx >= items.length) cb(true);
        else cb(null, items[idx]);
      });
    }

    drain(
      null,
      (err: any) => {
        expect(err).toBeNull();
        // With mutation cbed=true, loop won't stop for async reads
        // causing extra reads beyond N+1
        expect(readCount).toBe(4);
        done();
      }
    )(source);

    function pump() {
      if (callbacks.length > 0) {
        const cb = callbacks.shift()!;
        cb();
        setImmediate(pump);
      }
    }
    setImmediate(pump);
  });
});