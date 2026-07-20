import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain without done callback - error handling", () => {
  it("should console.warn an Error object (not undefined) when stream ends with error and no done callback", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

    // Create a source that immediately ends with an error (synchronous)
    const error = new Error("stream error");
    const source = (_abort: any, cb: (end: any, data?: any) => void) => {
      cb(error);
    };

    // No done callback provided - drain(op, done) with both null
    const sink = drain(null, null);

    // The drain will throw the error since there's no done callback
    expect(() => {
      sink(source);
    }).toThrow("stream error");

    // The console.warn should have been called with an Error instance (not undefined)
    expect(warnSpy).toHaveBeenCalled();
    const warnArg = warnSpy.mock.calls[0][0];
    // Original code: doneLackingErr is an Error instance
    // Mutated code: doneLackingErr is undefined
    expect(warnArg).toBeInstanceOf(Error);
    expect((warnArg as Error).message).toBe("no done callback supplied");

    warnSpy.mockRestore();
  });
});