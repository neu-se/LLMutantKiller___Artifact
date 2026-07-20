import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain without done callback throws on error", () => {
  it("should throw when an error occurs and no done callback is provided", () => {
    // Create a source that immediately errors
    const testError = new Error("test stream error");
    
    const errorSource = function (_abort: any, cb: (err: any, data?: any) => void) {
      cb(testError);
    };

    const sink = drain();

    // The drain should throw when it encounters an error without a done callback
    expect(() => {
      sink(errorSource);
    }).toThrow(testError);
  });
});