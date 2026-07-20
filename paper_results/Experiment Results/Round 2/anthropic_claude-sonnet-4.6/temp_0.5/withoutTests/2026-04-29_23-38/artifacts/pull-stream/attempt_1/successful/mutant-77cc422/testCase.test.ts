import count from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe("count source", () => {
  it("should stop emitting values when end signal is sent", (done) => {
    const source = count(10);
    
    // First, get a value to confirm it works
    source(null, (err: any, val: any) => {
      expect(err).toBeNull();
      expect(val).toBe(0);
      
      // Now send an end signal - the source should call cb with the end value
      source(true, (endErr: any) => {
        // In original code: if(end) return cb && cb(end)
        // So cb should be called with true (the end value)
        expect(endErr).toBe(true);
        done();
      });
    });
  });
});