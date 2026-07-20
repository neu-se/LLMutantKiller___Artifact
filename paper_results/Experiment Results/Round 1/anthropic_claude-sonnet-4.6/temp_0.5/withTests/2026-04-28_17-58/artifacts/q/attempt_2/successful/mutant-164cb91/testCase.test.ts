import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandledRejection event emission", () => {
  it("should emit the unhandledRejection process event when a promise is rejected and unhandled", (done) => {
    Q.resetUnhandledRejections();

    const reason = new Error("test unhandled rejection");
    let emittedReason: unknown = undefined;

    const handler = (r: unknown) => {
      emittedReason = r;
    };

    process.on("unhandledRejection", handler);

    // Create a rejected promise that is not handled
    Q.reject(reason);

    // We need to wait for two rounds of nextTick.runAfter:
    // 1. The first runAfter checks if the promise is still in unhandledRejections
    // 2. Then emits the event
    // Use setImmediate twice to ensure both async rounds complete
    setImmediate(() => {
      setImmediate(() => {
        setImmediate(() => {
          process.removeListener("unhandledRejection", handler);
          Q.resetUnhandledRejections();
          expect(emittedReason).toBe(reason);
          done();
        });
      });
    });
  });
});