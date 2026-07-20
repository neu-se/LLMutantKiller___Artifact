import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain without done callback error message", () => {
  it("should console.warn with an error message 'no done callback supplied' when stream errors and no done callback is provided", () => {
    const streamError = new Error("stream error");
    
    // Create a source that immediately errors
    function errorSource(abort: any, cb: Function) {
      cb(streamError);
    }
    
    const sink = drain(null, undefined);
    
    let warnedError: Error | null = null;
    const originalWarn = console.warn;
    console.warn = (err: any) => {
      warnedError = err;
    };
    
    try {
      sink(errorSource);
    } catch (e) {
      // expected to throw the stream error
    } finally {
      console.warn = originalWarn;
    }
    
    expect(warnedError).not.toBeNull();
    expect((warnedError as unknown as Error).message).toBe("no done callback supplied");
  });
});