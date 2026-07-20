import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain without done callback when stream ends with error", () => {
  it("should throw the error when stream ends with an actual error and no done callback is provided", () => {
    const error = new Error("stream error");
    
    // Create a read function that immediately ends with an error
    function errorRead(_abort: any, cb: (end: any, data?: any) => void) {
      cb(error);
    }
    
    // Create drain without a done callback - only op provided
    const sink = drain(null);
    
    // The sink should throw when the stream ends with an error
    expect(() => {
      sink(errorRead);
    }).toThrow("stream error");
  });
});