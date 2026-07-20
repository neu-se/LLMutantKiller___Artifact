import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain without done callback - normal stream end", () => {
  it("should not throw when stream ends normally (end === true) and no done callback is provided", (done) => {
    // Create a simple source that emits a few values then ends normally
    const values = [1, 2, 3];
    let index = 0;
    
    function source(abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        cb(abort);
        return;
      }
      if (index >= values.length) {
        // Normal end: end === true
        cb(true);
        return;
      }
      cb(null, values[index++]);
    }

    // No done callback provided - this is the critical part
    // With original code: when end === true, `end !== true` is false, so no throw
    // With mutated code: when end === true, `end !== false` is true, so it throws
    const sink = drain(null);

    expect(() => {
      sink(source);
    }).not.toThrow();

    // Give it a tick to complete async processing
    setImmediate(() => {
      done();
    });
  });
});