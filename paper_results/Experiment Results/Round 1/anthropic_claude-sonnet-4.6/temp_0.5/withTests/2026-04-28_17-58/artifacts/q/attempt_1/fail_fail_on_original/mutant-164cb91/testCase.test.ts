import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandledRejection event emission", () => {
  it("should emit the unhandledRejection process event when a promise is rejected and unhandled", (done) => {
    Q.resetUnhandledRejections();

    const reason = new Error("test unhandled rejection");
    let emittedReason: unknown = undefined;
    let emittedPromise: unknown = undefined;

    const handler = (r: unknown, p: unknown) => {
      emittedReason = r;
      emittedPromise = p;
    };

    process.on("unhandledRejection", handler);

    // Create a rejected promise that is not handled
    const rejectedPromise = Q.reject(reason);

    // Use runAfter to check after the next tick processing
    Q.nextTick.runAfter(function () {
      process.removeListener("unhandledRejection", handler);

      expect(emittedReason).toBe(reason);
      expect(emittedPromise).toBe(rejectedPromise);

      Q.resetUnhandledRejections();
      done();
    });
  });
});