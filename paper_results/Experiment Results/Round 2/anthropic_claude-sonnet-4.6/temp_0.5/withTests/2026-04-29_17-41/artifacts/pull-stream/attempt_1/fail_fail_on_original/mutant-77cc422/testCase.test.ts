import { count } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe("count source - abort/end behavior", () => {
  it("should call cb with the end signal when end is truthy (abort)", (done) => {
    const source = count(10);

    // First, read a value to confirm it works
    source(null, (err: any, val: any) => {
      expect(err).toBeNull();
      expect(val).toBe(0);

      // Now send an abort signal (end = true)
      const abortSignal = true;
      source(abortSignal, (endErr: any) => {
        // In the original code: if(end) return cb && cb(end)
        // So cb should be called with the abort signal (true)
        expect(endErr).toBe(true);
        done();
      });
    });
  });
});