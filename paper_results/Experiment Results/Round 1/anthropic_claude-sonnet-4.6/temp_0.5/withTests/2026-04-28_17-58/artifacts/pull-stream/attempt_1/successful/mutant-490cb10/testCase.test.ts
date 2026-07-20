import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain - doneLackingErr behavior", () => {
  it("should warn with an Error object (not undefined) when no done callback is provided and stream errors", () => {
    const warnArgs: any[] = [];
    const originalWarn = console.warn;
    console.warn = (...args: any[]) => {
      warnArgs.push(...args);
    };

    const testError = new Error("stream error");

    // Create a source that immediately errors
    function errorSource(_abort: any, cb: (end: any, data?: any) => void) {
      cb(testError);
    }

    const sink = drain(null, undefined);
    
    let threw = false;
    try {
      sink(errorSource);
    } catch (e) {
      threw = true;
      // Expected: the error is thrown
    }

    console.warn = originalWarn;

    // The stream should have thrown
    expect(threw).toBe(true);
    
    // console.warn should have been called once
    expect(warnArgs.length).toBe(1);
    
    // In the original code, doneLackingErr is an Error instance
    // In the mutated code, doneLackingErr is undefined
    expect(warnArgs[0]).toBeInstanceOf(Error);
  });
});