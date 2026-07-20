import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink error handling without done callback", () => {
  it("should throw when stream ends with a real error and no done callback is provided", () => {
    // Create a source that immediately ends with a real error
    const realError = new Error("stream error");
    
    let callCount = 0;
    const source = (_abort: any, cb: (end: any, data?: any) => void) => {
      callCount++;
      if (callCount === 1) {
        // First call: return some data
        cb(null, "data1");
      } else {
        // Second call: end with a real error
        cb(realError);
      }
    };

    // No done callback - this should cause the error to be thrown
    // In original: end !== true means real error triggers throw
    // In mutated: end === true means only normal end triggers throw (real error won't throw)
    const sink = drain(null); // no done callback
    
    expect(() => {
      sink(source);
    }).toThrow(realError);
  });
});