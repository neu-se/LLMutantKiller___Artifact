import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort with function as first argument", () => {
  it("should treat a function passed as the first argument to abort as the done callback", (done) => {
    // Create a simple pull-stream source that produces values
    let i = 0;
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end) {
        cb(end);
        return;
      }
      // Produce values slowly (async to allow abort to be called)
      setTimeout(() => {
        cb(null, i++);
      }, 10);
    };

    // Create a drain that does nothing special with each value
    const sink = drain(
      (data: any) => {
        // do nothing
      },
      null as any
    );

    // Connect source to sink
    sink(source);

    // Call abort with a function as the first argument (no error, just callback)
    // In original code: if('function' == typeof err) => cb = err, err = true
    // This means the function becomes the done callback, and abort is set to true
    sink.abort((err: any) => {
      // In original code, err should be null (since abort === true, done is called with null)
      // In mutated code, the function is used as the error, so this callback is never called
      // and instead the function would be passed as the abort error
      expect(err).toBeNull();
      done();
    });
  });
});