import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain - normal stream end without done callback", () => {
  it("should not throw when stream ends normally (end === true) and no done callback is provided", (done) => {
    const drainSink = drain(null, undefined);

    // Create a source that emits one value then ends normally with true
    let callCount = 0;
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
        return;
      }
      callCount++;
      if (callCount === 1) {
        cb(null, "hello");
      } else {
        cb(true); // normal end
      }
    };

    // The drain should complete without throwing
    // With the mutation, end || end !== true => true || false => true when end===true
    // causing it to throw even on normal stream end
    expect(() => {
      drainSink(source);
    }).not.toThrow();

    // Give it time to process
    setTimeout(() => {
      done();
    }, 50);
  });
});