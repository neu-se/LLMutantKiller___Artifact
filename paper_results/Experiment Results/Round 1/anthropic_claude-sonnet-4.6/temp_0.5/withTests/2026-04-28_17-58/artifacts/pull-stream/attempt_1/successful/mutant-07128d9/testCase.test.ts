import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain without done callback on normal stream end", () => {
  it("should not throw when stream ends normally (end === true) and no done callback is provided", (done) => {
    // Create a simple source that emits values and then ends normally
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

    // drain without a done callback - should complete without throwing
    // In original: when end === true, the else if(end && end !== true) is false, so no throw
    // In mutated: when end === true, else if(true) is true, so it throws end (which is `true`)
    expect(() => {
      const sink = drain(
        function op(data: any) {
          // process data normally
        }
        // no done callback intentionally
      );
      
      sink(source);
    }).not.toThrow();

    // Give it a tick to complete since the stream is sync
    setImmediate(() => {
      done();
    });
  });
});