import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("should not throw when stream ends normally without a done callback", () => {
    // Create a simple source that emits one item then ends
    const values = [1];
    let callCount = 0;
    
    function source(end: any, cb: (end: any, data?: any) => void) {
      if (end) {
        cb(end, null);
        return;
      }
      if (callCount < values.length) {
        cb(null, values[callCount++]);
      } else {
        // Normal end of stream
        cb(true, null);
      }
    }

    // No done callback provided - this is key to triggering the mutation
    // In original: when end === true, the else if(end && end !== true) is false, so no throw
    // In mutated: when end === true, the else if(end && true) is true, so it throws true
    expect(() => {
      const sink = drain(null);
      sink(source);
    }).not.toThrow();
  });
});