import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("should call callback with the actual error when stream ends with an error and no match was found", (done) => {
    const streamError = new Error("stream error");
    let callCount = 0;
    
    // A pull-stream source that emits one value then errors
    function source(end: any, cb: Function) {
      if (end) return cb(end);
      callCount++;
      if (callCount === 1) {
        cb(null, 42); // emit a value that doesn't match
      } else {
        cb(streamError); // signal error
      }
    }

    const sink = find(
      (data: number) => data > 1000, // predicate that never matches
      (err: any, data: any) => {
        // Original: err should be the actual streamError (err===true is false, so returns err)
        // Mutated:  err would be null (err!==true is true, so returns null - swallows error!)
        expect(err).toBe(streamError);
        expect(data).toBeNull();
        done();
      }
    );

    sink(source);
  });
});