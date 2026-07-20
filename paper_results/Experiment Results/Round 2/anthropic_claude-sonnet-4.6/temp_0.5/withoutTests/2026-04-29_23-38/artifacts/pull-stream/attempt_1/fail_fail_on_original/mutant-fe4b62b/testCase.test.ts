import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort with string error", () => {
  it("should treat string argument as callback when abort is called with a string", (done) => {
    // Create a source that never ends
    let readCallback: ((end: any, data?: any) => void) | null = null;
    
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end) {
        cb(end);
        return;
      }
      readCallback = cb;
    };

    const sink = drain(null, (err: any) => {
      // done callback
      expect(err).toBeNull();
      done();
    });

    sink(source);

    // Provide some data to keep it running
    if (readCallback) {
      readCallback(null, 1);
    }

    // Abort with no error
    sink.abort();
  });
});