import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain without done callback", () => {
  it("should not throw when stream ends normally and no done callback is provided", (done) => {
    // Create a simple source that yields a few values and then ends
    const values = [1, 2, 3];
    let i = 0;
    const source = function (end: any, cb: (end: any, data?: any) => void) {
      if (end) return cb(end);
      if (i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    // Create drain with an op callback but NO done callback
    // In the original: if(done) done(...) -> done is undefined, so it's skipped safely
    // In the mutated: if(true) done(...) -> done is undefined, calling undefined() throws TypeError
    const sink = drain(function (data: any) {
      // process data normally
    }); // no done callback passed

    // This should complete without throwing
    expect(() => {
      sink(source);
    }).not.toThrow();

    // Give it a tick to complete async processing
    setImmediate(() => {
      done();
    });
  });
});