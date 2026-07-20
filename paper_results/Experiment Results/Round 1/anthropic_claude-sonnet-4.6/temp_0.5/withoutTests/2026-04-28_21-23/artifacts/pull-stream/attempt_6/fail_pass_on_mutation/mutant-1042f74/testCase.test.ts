import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("handles source correctly when transitioning from async to sync", (done) => {
    const received: number[] = [];
    let callNumber = 0;
    const pendingCbs: Array<(err: any, data?: any) => void> = [];
    
    function source(end: any, cb: (err: any, data?: any) => void) {
      if (end) { cb(end); return; }
      callNumber++;
      if (callNumber === 1) {
        pendingCbs.push(cb); // async first call
      } else {
        cb(null, callNumber); // sync subsequent calls
      }
    }
    
    drain(
      (x: number) => { 
        received.push(x);
        if (received.length >= 3) return false; // stop after 3
      },
      (err: any) => {
        expect(received.length).toBeGreaterThan(0);
        done();
      }
    )(source);
    
    // Fire the first async callback
    setImmediate(() => {
      if (pendingCbs.length > 0) {
        pendingCbs[0](null, 1);
      }
    });
  });
});