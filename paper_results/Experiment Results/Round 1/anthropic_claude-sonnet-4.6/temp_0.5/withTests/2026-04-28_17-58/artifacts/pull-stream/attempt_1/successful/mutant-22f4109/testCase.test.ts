import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain doneLackingErr behavior", () => {
  it("should warn with an Error object (not undefined) when no done callback is provided and stream errors", () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

    const err = new Error("stream error");

    // Create a source that immediately errors
    function errorSource(abort: any, cb: Function) {
      cb(err);
    }

    const sink = drain(null, undefined);

    expect(() => {
      sink(errorSource as any);
    }).toThrow(err);

    expect(warnSpy).toHaveBeenCalledTimes(1);
    // In the original code, doneLackingErr is set when !done, so it's an Error instance
    // In the mutated code, doneLackingErr is set when done (truthy), so when done is absent, it's undefined
    const warnArg = warnSpy.mock.calls[0][0];
    expect(warnArg).toBeInstanceOf(Error);

    warnSpy.mockRestore();
  });
});