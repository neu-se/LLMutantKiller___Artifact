import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe("through", () => {
  it("should pass the actual error object to onEnd when stream ends with an error (not true)", (done) => {
    const actualError = new Error("stream error");
    let receivedByOnEnd: any = "not-called";

    const throughStream = through(null, function(err: any) {
      receivedByOnEnd = err;
    });

    // Source that immediately ends with an actual error (not boolean true)
    const errorSource = function(_end: any, cb: Function) {
      cb(actualError, null);
    };

    const readable = throughStream(errorSource);

    readable(null, function(_end: any, _data: any) {
      // once(end) is called with actualError inside the read callback
      // original: onEnd(actualError === true ? null : actualError) => onEnd(actualError)
      // mutated:  onEnd(true ? null : actualError) => onEnd(null)
      expect(receivedByOnEnd).toBe(actualError);
      done();
    });
  });
});