import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink without done callback", () => {
  it("should not throw when stream ends normally (end === true) and no done callback is provided", () => {
    // Create a simple source that immediately ends with `true` (normal completion)
    function source(end: any, cb: (end: any, data?: any) => void) {
      cb(true, null);
    }

    // Create drain without a done callback - stream ends normally
    const sink = drain(null);

    // In the original code: end === true, so `else if(end && end !== true)` is false, no throw
    // In the mutated code: `else if(true)` always executes, so it throws `true`
    expect(() => {
      sink(source);
    }).not.toThrow();
  });
});