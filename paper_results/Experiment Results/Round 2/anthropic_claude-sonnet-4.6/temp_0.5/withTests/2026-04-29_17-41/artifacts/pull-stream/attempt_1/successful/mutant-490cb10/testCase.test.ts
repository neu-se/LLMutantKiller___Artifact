import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain without done callback", () => {
  it("should call console.warn with an Error object when an error occurs and no done callback is provided", () => {
    const originalWarn = console.warn;
    let warnedValue: unknown;
    let warnCallCount = 0;

    console.warn = (val: unknown) => {
      warnCallCount++;
      warnedValue = val;
    };

    const error = new Error("test error");

    // Create a source that emits an error
    function errorSource(_abort: unknown, cb: (end: unknown, data?: unknown) => void) {
      cb(error);
    }

    const sink = drain(null, null);

    let threw = false;
    try {
      sink(errorSource);
    } catch (e) {
      threw = true;
    }

    console.warn = originalWarn;

    expect(threw).toBe(true);
    expect(warnCallCount).toBe(1);
    // In the original code, doneLackingErr is an Error instance
    // In the mutated code, doneLackingErr is undefined
    expect(warnedValue).toBeInstanceOf(Error);
  });
});