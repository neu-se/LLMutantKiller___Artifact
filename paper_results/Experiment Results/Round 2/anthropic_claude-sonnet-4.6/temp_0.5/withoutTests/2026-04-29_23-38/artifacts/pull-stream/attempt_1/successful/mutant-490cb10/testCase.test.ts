import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain - doneLackingErr behavior", () => {
  it("should warn with an Error object when no done callback is provided and stream ends with error", (done) => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

    // Create a source that ends with an error
    const error = new Error("stream error");
    let called = false;
    const source = (_abort: any, cb: Function) => {
      if (!called) {
        called = true;
        cb(error, null);
      }
    };

    const sink = drain(null, null);
    
    // We expect the sink to throw the error since no done callback
    expect(() => {
      sink(source);
    }).toThrow("stream error");

    expect(warnSpy).toHaveBeenCalledTimes(1);
    const warnArg = warnSpy.mock.calls[0][0];
    
    // In original: doneLackingErr is an Error instance
    // In mutated: doneLackingErr is undefined
    expect(warnArg).toBeInstanceOf(Error);
    expect(warnArg.message).toBe("no done callback supplied");

    warnSpy.mockRestore();
    done();
  });
});