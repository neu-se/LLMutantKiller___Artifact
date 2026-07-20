import count from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe("count source - end handling", () => {
  it("should call cb with end signal when end is truthy", (done) => {
    const source = count(10);
    
    // First, get a value to ensure the source is working
    source(null, (err: any, val: any) => {
      expect(err).toBeNull();
      expect(val).toBe(0);
      
      // Now send an end signal - the original code should call cb with the end value
      source(true, (endErr: any) => {
        expect(endErr).toBe(true);
        done();
      });
    });
  });
});