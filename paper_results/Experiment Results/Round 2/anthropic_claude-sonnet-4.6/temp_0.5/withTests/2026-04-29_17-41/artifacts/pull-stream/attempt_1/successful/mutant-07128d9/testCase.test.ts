import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain without done callback on normal stream end", () => {
  it("should not throw when stream ends normally (end === true) and no done callback is provided", (done) => {
    // Create a simple source that emits one value then ends normally
    const values = [1, 2, 3];
    let i = 0;
    
    function source(abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        cb(abort);
        return;
      }
      if (i >= values.length) {
        cb(true); // normal end
      } else {
        cb(null, values[i++]);
      }
    }

    // Using drain WITHOUT a done callback - this is the critical part
    // In original: when end === true, the else if(end && end !== true) is false, so no throw
    // In mutated: when end === true, else if(true) is always true, so it throws end (which is `true`)
    expect(() => {
      const sink = drain(
        (data: any) => {
          // op function - just consume data
        }
        // No done callback provided intentionally
      );
      
      // Connect source to sink
      sink(source);
    }).not.toThrow();

    // Give it time to process synchronously
    // Since the source is sync, drain will process everything inline
    // We need to verify no exception was thrown
    setTimeout(done, 50);
  });
});