import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('handles mixed sync/async source correctly', (done) => {
    const collected: number[] = [];
    let i = 0;
    const items = [1, 2, 3, 4, 5];
    let asyncPending: (() => void) | null = null;

    function source(abort: any, cb: (end: any, data?: any) => void) {
      if (abort) return cb(abort);
      if (i >= items.length) return cb(true); // sync end
      const val = items[i++];
      if (val % 2 === 0) {
        // async for even values
        asyncPending = () => cb(null, val);
      } else {
        // sync for odd values
        cb(null, val);
      }
    }

    drain(
      (val: number) => { collected.push(val); },
      (err: any) => {
        expect(err).toBeNull();
        expect(collected).toEqual([1, 2, 3, 4, 5]);
        done();
      }
    )(source);

    function pump() {
      if (asyncPending) {
        const p = asyncPending;
        asyncPending = null;
        p();
        setImmediate(pump);
      }
    }
    setImmediate(pump);
  });
});