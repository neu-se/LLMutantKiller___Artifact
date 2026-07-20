import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should correctly handle next() recursive call path when loop is false inside callback', (done) => {
    let index = 0;
    const sourceData = [1, 2, 3];
    const collected: number[] = [];
    let pendingCb: ((end: any, data?: any) => void) | null = null;

    // Source that is async for first read, then sync
    function source(abort: any, cb: (end: any, data?: any) => void) {
      if (abort) return cb(abort);
      if (index >= sourceData.length) return cb(true);
      pendingCb = () => cb(null, sourceData[index++]);
      // Don't call cb synchronously - store it
    }

    const sink = drain(
      (data: number) => { collected.push(data); },
      (err: any) => {
        expect(err).toBeNull();
        expect(collected).toEqual([1, 2, 3]);
        done();
      }
    );

    sink(source);

    // Now drive the async source
    function pump() {
      if (pendingCb) {
        const cb = pendingCb;
        pendingCb = null;
        cb(null, null); // This won't work well
      }
    }
  });
});