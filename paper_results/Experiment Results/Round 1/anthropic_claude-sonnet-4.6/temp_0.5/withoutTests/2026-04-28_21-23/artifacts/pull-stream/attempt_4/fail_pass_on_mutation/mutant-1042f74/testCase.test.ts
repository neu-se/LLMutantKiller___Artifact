import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("should not make concurrent read calls with async source", (done) => {
    let pendingCallbacks = 0;
    const received: number[] = [];
    const items = [1, 2, 3];
    let idx = 0;
    const callbacks: Array<() => void> = [];
    
    function source(end: any, cb: (err: any, data?: any) => void) {
      if (end) { 
        setImmediate(() => cb(end));
        return; 
      }
      pendingCallbacks++;
      const i = idx++;
      callbacks.push(() => {
        pendingCallbacks--;
        if (i < items.length) cb(null, items[i]);
        else cb(true);
      });
    }
    
    drain(
      (x: number) => { received.push(x); },
      (err: any) => {
        expect(err).toBeNull();
        expect(received).toEqual([1, 2, 3]);
        done();
      }
    )(source);
    
    // Manually fire callbacks one at a time
    function fireNext() {
      if (callbacks.length > 0) {
        // At this point, only 1 pending callback should exist
        expect(pendingCallbacks).toBe(1);
        const cb = callbacks.shift()!;
        cb();
        setImmediate(fireNext);
      }
    }
    
    setImmediate(fireNext);
  });
});