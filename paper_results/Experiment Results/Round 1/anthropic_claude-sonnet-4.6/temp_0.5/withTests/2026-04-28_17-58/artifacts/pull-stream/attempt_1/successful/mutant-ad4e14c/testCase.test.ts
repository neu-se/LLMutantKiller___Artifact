import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe("through onEnd callback", () => {
  it("should call onEnd with null when stream ends normally (abort === true)", (done) => {
    let onEndArg: any = "NOT_CALLED";

    const throughStream = through(null, function(err: any) {
      onEndArg = err;
    });

    // Create a simple source that ends immediately
    const source = function(end: any, cb: Function) {
      if (end) {
        cb(end);
        return;
      }
      // End the stream normally
      cb(true);
    };

    const readable = throughStream(source);

    readable(null, function(end: any, data: any) {
      // Stream ended with true (normal end)
      // onEnd should have been called with null, not true
      setTimeout(() => {
        expect(onEndArg).toBe(null);
        done();
      }, 0);
    });
  });
});