import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("should call callback with the actual error when stream ends with an error and no match was found", (done) => {
    const actualError = new Error("stream error");
    let callCount = 0;
    
    // Pull-stream source that emits one value then errors
    const source = (end: any, cb: Function) => {
      if (end) {
        return cb(end);
      }
      if (callCount === 0) {
        callCount++;
        cb(null, 42);
      } else {
        // End with an actual error (not true)
        cb(actualError);
      }
    };
    
    // find with a predicate that never matches
    const sink = find((x: number) => x > 1000, (err: any, data: any) => {
      // Original: err !== true so cb(actualError, null) → err is the actual error
      // Mutated: err !== true is true so cb(null, null) → err is null
      if (err === actualError) {
        done();
      } else {
        done(new Error(`Expected err to be the actual error but got: ${err}`));
      }
    });
    
    sink(source);
  });
});