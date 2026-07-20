import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain - doneLackingErr initialization", () => {
  it("should call console.warn with an Error object (not undefined) when no done callback is provided and stream errors", () => {
    const warnArgs: any[] = [];
    const originalWarn = console.warn;
    console.warn = (...args: any[]) => {
      warnArgs.push(...args);
    };

    const error = new Error("test error");
    
    // Create a source that immediately errors
    function errorSource(abort: any, cb: (end: any, data?: any) => void) {
      cb(error);
    }

    const sink = drain(null, undefined);
    
    let threw = false;
    try {
      sink(errorSource);
    } catch (e) {
      threw = true;
    }

    console.warn = originalWarn;

    expect(threw).toBe(true);
    expect(warnArgs.length).toBe(1);
    // In the original code, doneLackingErr is set when !done (no callback),
    // so it should be an Error instance with a stack trace.
    // In the mutated code, doneLackingErr is set when done is truthy,
    // so when done is undefined, doneLackingErr remains undefined.
    expect(warnArgs[0]).toBeInstanceOf(Error);
    expect(warnArgs[0].message).toBe("no done callback supplied");
  });
});