import count from "../../../../../../../../../../../subject_repositories/pull-stream/sources/count.js";

describe("count source - abort/end handling", () => {
  it("should call cb with the end signal when end is truthy (abort)", (done) => {
    const source = count(10);

    // First, do a normal read to get things started
    source(null, (err: any, val: any) => {
      expect(err).toBeNull();
      expect(val).toBe(0);

      // Now abort the stream with a truthy end value
      const abortError = new Error("abort");
      source(abortError, (end: any) => {
        // In the original code: if(end) return cb && cb(end)
        // so cb is called with the abort error
        // In the mutated code: if(false) means abort is never handled,
        // so the stream continues and cb(null, i++) is called instead
        expect(end).toBe(abortError);
        done();
      });
    });
  });
});