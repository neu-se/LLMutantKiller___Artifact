import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain without done callback throws on stream error", () => {
  it("should throw an error when stream ends with an error and no done callback is provided", () => {
    const testError = new Error("stream error");

    // Create a source that immediately errors
    function errorSource(abort: any, cb: (end: any, data?: any) => void) {
      cb(testError);
    }

    const sink = drain(null);

    expect(() => {
      sink(errorSource);
    }).toThrow(testError);
  });
});