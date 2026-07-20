import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink behavior when stream ends normally without done callback", () => {
  it("should not throw when stream ends normally (end === true) and no done callback is provided", () => {
    // Create a simple synchronous source that immediately ends
    function immediateEndSource(end: any, cb: (end: any, data?: any) => void) {
      cb(true, null); // Signal normal end with end === true
    }

    // The original code should NOT throw when end === true and no done callback
    // The mutated code WILL throw because else if(true) always executes
    expect(() => {
      const sink = drain(null, null);
      sink(immediateEndSource);
    }).not.toThrow();
  });
});