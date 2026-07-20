import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done error propagation", () => {
  it("should call Q.onerror when a rejected promise is passed to done with no errback", (done) => {
    const originalOnerror = Q.onerror;
    const error = new Error("test rejection error");

    Q.onerror = function (err: any) {
      Q.onerror = originalOnerror;
      expect(err).toBe(error);
      done();
    };

    // Set a timeout to fail the test if Q.onerror is never called
    const timeout = setTimeout(() => {
      Q.onerror = originalOnerror;
      done(new Error("Q.onerror was never called - error was silently swallowed"));
    }, 500);

    Q.reject(error).done();

    // Clear timeout if done is called first
    const originalDone = done;
    (done as any).__wrapped = true;
  });
});