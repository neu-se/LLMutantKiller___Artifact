import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain without done callback - error handling", () => {
  it("should throw when stream ends with a real error and no done callback is provided", () => {
    const testError = new Error("test stream error");
    
    // Create a source that immediately ends with a real error
    function errorSource(abort: any, cb: (end: any, data?: any) => void) {
      cb(testError);
    }
    
    const sink = drain(null);
    
    // The drain should throw the error since no done callback was provided
    // and the stream ended with a real (non-true) error
    expect(() => {
      sink(errorSource);
    }).toThrow(testError);
  });
});