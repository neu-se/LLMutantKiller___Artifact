import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain without done callback", () => {
  it("should console.warn an Error instance when stream ends with error and no done callback is provided", () => {
    const originalWarn = console.warn;
    const warnArgs: any[] = [];
    console.warn = (...args: any[]) => {
      warnArgs.push(...args);
    };

    const error = new Error("test error");
    
    // Create a source that immediately errors
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      cb(error);
    };

    const sink = drain(null, null);
    
    try {
      sink(source);
    } catch (e) {
      // expected to throw
    }

    console.warn = originalWarn;

    // In original code: doneLackingErr is an Error instance
    // In mutated code: doneLackingErr is undefined (never assigned)
    expect(warnArgs[0]).toBeInstanceOf(Error);
    expect(warnArgs[0].message).toBe("no done callback supplied");
  });
});