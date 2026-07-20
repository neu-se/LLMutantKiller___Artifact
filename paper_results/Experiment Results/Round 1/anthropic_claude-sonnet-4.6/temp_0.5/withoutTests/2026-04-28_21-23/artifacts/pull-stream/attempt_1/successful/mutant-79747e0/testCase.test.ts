import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain without done callback", () => {
  it("should not throw when stream ends normally and no done callback is provided", (done) => {
    // Create a simple readable source that emits one value then ends
    let count = 0;
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end) return cb(end, null);
      if (count === 0) {
        count++;
        cb(null, "data");
      } else {
        cb(true, null); // end of stream
      }
    };

    // Call drain without a done callback - original should handle this gracefully
    // Mutated code will try to call undefined as a function, throwing a TypeError
    let threw = false;
    try {
      const sink = drain(null);
      sink(source);
      // Give it a tick to process
      setTimeout(() => {
        expect(threw).toBe(false);
        done();
      }, 10);
    } catch (e) {
      threw = true;
      // Original code should not throw, mutated code will throw TypeError
      done(e);
    }
  });
});