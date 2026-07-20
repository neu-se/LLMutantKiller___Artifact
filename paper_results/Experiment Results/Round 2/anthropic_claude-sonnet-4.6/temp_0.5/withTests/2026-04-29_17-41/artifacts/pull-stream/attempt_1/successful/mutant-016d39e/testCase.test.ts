import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain - doneLackingErr message", () => {
  it("should warn with 'no done callback supplied' message when no done callback and stream errors", () => {
    const warnMessages: Error[] = [];
    const originalWarn = console.warn;
    console.warn = (msg: any) => {
      warnMessages.push(msg);
    };

    const error = new Error("stream error");
    
    // Create a source that immediately errors
    function errorSource(abort: any, cb: (end: any, data?: any) => void) {
      cb(error);
    }

    const sink = drain(null, null);
    
    try {
      sink(errorSource);
    } catch (e) {
      // expected to throw
    } finally {
      console.warn = originalWarn;
    }

    expect(warnMessages.length).toBe(1);
    expect(warnMessages[0]).toBeInstanceOf(Error);
    expect((warnMessages[0] as Error).message).toBe("no done callback supplied");
  });
});