import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('op is called exactly once per item for async source', (done) => {
    const opCalls: number[] = [];
    let i = 0;
    const items = [1, 2, 3];
    const pending: Array<() => void> = [];

    function source(abort: any, cb: (end: any, data?: any) => void) {
      if (abort) return cb(abort);
      const idx = i++;
      pending.push(() => {
        if (idx >= items.length) cb(true);
        else cb(null, items[idx]);
      });
    }

    drain(
      (val: number) => { opCalls.push(val); },
      (err: any) => {
        expect(err).toBeNull();
        expect(opCalls).toEqual([1, 2, 3]);
        done();
      }
    )(source);

    function pump() {
      if (pending.length > 0) {
        pending.shift()!();
        setImmediate(pump);
      }
    }
    setImmediate(pump);
  });
});