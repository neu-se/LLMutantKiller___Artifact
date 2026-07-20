import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe("through onEnd callback", () => {
  it("should pass the actual error to onEnd when stream ends with an error (not true)", (done) => {
    const actualError = new Error("stream error");
    let receivedError: any = undefined;

    const onEnd = (err: any) => {
      receivedError = err;
    };

    const throughStream = through(undefined, onEnd);

    // Create a source that ends with an actual error
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end) {
        cb(end, null);
        return;
      }
      // First call: end with an actual error
      cb(actualError, null);
    };

    const sink = throughStream(source);

    // Read from the sink - the source will return an error
    sink(null, (end: any, data: any) => {
      // After reading, onEnd should have been called with the actual error
      expect(receivedError).toBe(actualError);
      done();
    });
  });
});