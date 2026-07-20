import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain without done callback error message", () => {
  it("should throw an error with message 'no done callback supplied' when stream errors and no done callback is provided", () => {
    const error = new Error("stream error");
    
    // Create a source that immediately errors
    function errorSource(abort: any, cb: Function) {
      cb(error);
    }
    
    const sink = drain(null, undefined);
    
    // Suppress console.warn output during this test
    const originalWarn = console.warn;
    console.warn = () => {};
    
    let thrownError: Error | null = null;
    try {
      sink(errorSource);
    } catch (e) {
      thrownError = e as Error;
    } finally {
      console.warn = originalWarn;
    }
    
    expect(thrownError).not.toBeNull();
    expect(thrownError!.message).toBe("no done callback supplied");
  });
});