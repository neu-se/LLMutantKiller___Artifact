import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done error propagation", () => {
  it("should report errors via Q.onerror when a rejected promise is passed to done()", (done) => {
    const q = Q as any;
    const testError = new Error("test rejection error");
    let timeoutId: ReturnType<typeof setTimeout>;

    const originalOnerror = q.onerror;

    q.onerror = function (error: any) {
      clearTimeout(timeoutId);
      q.onerror = originalOnerror;
      try {
        expect(error).toBe(testError);
        done();
      } catch (e) {
        done(e);
      }
    };

    timeoutId = setTimeout(() => {
      q.onerror = originalOnerror;
      done(new Error("Q.onerror was never called - error was silently swallowed by the mutation"));
    }, 300);

    q.reject(testError).done();
  });
});