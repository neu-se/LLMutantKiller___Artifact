import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("calls done with null when op returns false and source acknowledges abort", (done) => {
    const items = [1, 2, 3];
    let idx = 0;
    
    function source(end: any, cb: (err: any, data?: any) => void) {
      if (end) { cb(null); return; } // acknowledge abort with null
      if (idx < items.length) cb(null, items[idx++]);
      else cb(true);
    }
    
    drain(
      (x: number) => { if (x === 2) return false; },
      (err: any) => {
        expect(err).toBeNull();
        done();
      }
    )(source);
  });
});