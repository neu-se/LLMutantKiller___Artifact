import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain without done callback - error handling", () => {
  it("should console.warn an Error object (not undefined) when stream ends with error and no done callback", (done) => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

    // Create a source that emits one item then ends with an error
    const error = new Error("stream error");
    let callCount = 0;
    const source = (_abort: any, cb: (end: any, data?: any) => void) => {
      callCount++;
      if (callCount === 1) {
        cb(null, "data");
      } else {
        cb(error);
      }
    };

    // No done callback provided
    const sink = drain(null, null);
    sink(source);

    // Use setImmediate to allow the async operations to complete
    setImmediate(() => {
      try {
        // The console.warn should have been called with an Error instance (not undefined)
        expect(warnSpy).toHaveBeenCalled();
        const warnArg = warnSpy.mock.calls[0][0];
        expect(warnArg).toBeInstanceOf(Error);
        expect((warnArg as Error).message).toBe("no done callback supplied");
        warnSpy.mockRestore();
        done();
      } catch (e) {
        warnSpy.mockRestore();
        done(e);
      }
    });
  });
});