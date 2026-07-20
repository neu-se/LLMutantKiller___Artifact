import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain without done callback throws when stream ends with error", () => {
  it("should throw the error when stream ends with a non-true error and no done callback is provided", () => {
    const testError = new Error("stream error");
    
    // Create a source that immediately ends with an error
    function errorSource(abort: any, cb: (end: any, data?: any) => void) {
      cb(testError);
    }
    
    // Create drain without a done callback - only an op function
    const sink = drain(function op(data: any) {
      // no-op
    });
    
    // The drain should throw when it encounters the error since there's no done callback
    expect(() => {
      sink(errorSource);
    }).toThrow(testError);
  });
});