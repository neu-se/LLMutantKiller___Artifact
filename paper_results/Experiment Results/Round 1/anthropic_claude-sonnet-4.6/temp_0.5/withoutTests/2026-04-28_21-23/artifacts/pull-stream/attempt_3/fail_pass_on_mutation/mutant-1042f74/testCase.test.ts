import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("should correctly process items from async source calling next recursively", (done) => {
    const received: number[] = [];
    const items = [1, 2, 3];
    let idx = 0;
    
    function asyncSource(end: any, cb: (err: any, data?: any) => void) {
      if (end) { cb(end); return; }
      const val = idx < items.length ? items[idx++] : null;
      const isEnd = val === null;
      Promise.resolve().then(() => cb(isEnd ? true : null, val));
    }
    
    drain(
      (x: number) => { received.push(x); },
      (err: any) => {
        expect(err).toBeNull();
        expect(received).toEqual([1, 2, 3]);
        done();
      }
    )(asyncSource);
  });
});