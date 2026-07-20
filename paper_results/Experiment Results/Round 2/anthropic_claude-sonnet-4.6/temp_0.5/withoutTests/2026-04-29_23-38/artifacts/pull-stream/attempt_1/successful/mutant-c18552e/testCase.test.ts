import through from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/through.js";

describe("through onEnd callback", () => {
  it("should pass the actual error to onEnd when abort is an error object (not true)", (done) => {
    const error = new Error("test error");
    let receivedAbort: any = undefined;

    const onEnd = (abort: any) => {
      receivedAbort = abort;
    };

    const throughStream = through(undefined, onEnd);

    // Create a fake read source that will emit an error
    const source = (end: any, cb: Function) => {
      cb(error, null);
    };

    const sink = throughStream(source);

    sink(null, (end: any, data: any) => {
      // After receiving the error, check what onEnd received
      expect(receivedAbort).toBe(error);
      done();
    });
  });
});