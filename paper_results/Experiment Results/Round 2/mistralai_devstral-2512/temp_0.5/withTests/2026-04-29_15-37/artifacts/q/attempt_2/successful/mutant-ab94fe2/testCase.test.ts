import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done() error handling", () => {
  it("should throw unhandled errors via Q.onerror when no callback is provided", (done) => {
    const error = new Error("Unhandled error");
    let onerrorCalled = false;

    Q.onerror = (err: Error) => {
      onerrorCalled = true;
      expect(err).toBe(error);
      done();
    };

    Q.reject(error).done();

    setTimeout(() => {
      if (!onerrorCalled) {
        done(new Error("Q.onerror was not called"));
      }
    }, 100);
  });
});