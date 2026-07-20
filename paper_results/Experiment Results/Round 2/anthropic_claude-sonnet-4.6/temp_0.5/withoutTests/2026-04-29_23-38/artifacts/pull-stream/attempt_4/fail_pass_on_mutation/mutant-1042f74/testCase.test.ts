import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("processes all items from async source via next() recursion", (done) => {
    const items = [1, 2, 3];
    let idx = 0;
    const callbacks: Function[] = [];
    
    function source(end: any, cb: Function) {
      if (end) { cb(end); return; }
      if (idx < items.length) {
        const val = items[idx++];
        callbacks.push(() => cb(null, val));
      } else {
        callbacks.push(() => cb(true, null));
      }
    }
    
    const collected: number[] = [];
    const sink = drain(
      (data: number) => { collected.push(data); },
      (err: any) => {
        expect(err).toBeNull();
        expect(collected).toEqual([1, 2, 3]);
        done();
      }
    );
    
    sink(source);
    
    // Drain callbacks one at a time
    function flush() {
      if (callbacks.length > 0) {
        const cb = callbacks.shift()!;
        cb();
        setTimeout(flush, 0);
      }
    }
    flush();
  });
});