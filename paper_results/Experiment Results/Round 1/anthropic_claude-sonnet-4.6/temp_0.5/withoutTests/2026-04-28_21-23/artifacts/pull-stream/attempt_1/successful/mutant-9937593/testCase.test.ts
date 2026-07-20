import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain without done callback throws on error end", () => {
  it("should throw the error when stream ends with an error and no done callback is provided", () => {
    const testError = new Error("stream error");
    
    // Create a source that ends with an error
    let readCallback: ((end: any, data?: any) => void) | null = null;
    
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      readCallback = cb;
    };
    
    // Create drain without a done callback - this is the key
    const sink = drain(null);
    
    // Connect the sink to the source
    sink(source);
    
    // Now trigger the error by calling the read callback with an error
    expect(() => {
      if (readCallback) {
        readCallback(testError);
      }
    }).toThrow(testError);
  });
});