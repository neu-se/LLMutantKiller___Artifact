import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("processes items correctly when source transitions from async to sync", (done) => {
    const received: number[] = [];
    let callCount = 0;
    
    function source(end: any, cb: (err: any, data?: any) => void) {
      if (end) { cb(end); return; }
      callCount++;
      if (callCount === 1) {
        setImmediate(() => cb(null, 1)); // async
      } else if (callCount === 2) {
        cb(null, 2); // sync
      } else {
        cb(true); // sync end
      }
    }
    
    drain(
      (x: number) => { received.push(x); },
      (err: any) => {
        expect(err).toBeNull();
        expect(received).toEqual([1, 2]);
        done();
      }
    )(source);
  });
});