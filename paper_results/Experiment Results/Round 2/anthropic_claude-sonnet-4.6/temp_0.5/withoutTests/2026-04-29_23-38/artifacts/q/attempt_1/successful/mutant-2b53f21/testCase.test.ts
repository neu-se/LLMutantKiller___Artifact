import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q reject untrackRejection behavior", () => {
  it("should remove a rejection from unhandled reasons when a rejection handler is attached", async () => {
    // Reset any existing unhandled rejections
    Q.resetUnhandledRejections();

    const reason = new Error("test rejection");
    
    // Create a rejected promise and handle it with a rejection callback
    const handledPromise = Q.reject(reason).then(
      null,
      function (err) {
        // rejection is handled here
        return "handled";
      }
    );

    // Wait for the promise chain to settle
    await new Promise<void>((resolve) => {
      handledPromise.then(() => {
        // Use nextTick to ensure all async processing is done
        Q.nextTick(function () {
          Q.nextTick(function () {
            resolve();
          });
        });
      });
    });

    // In the original code, untrackRejection is called when the rejection handler
    // is invoked, so unhandledReasons should be empty after handling.
    // In the mutated code, untrackRejection is never called, so the reason
    // remains in the unhandled reasons list.
    const unhandledReasons = Q.getUnhandledReasons();
    expect(unhandledReasons.length).toBe(0);
  });
});