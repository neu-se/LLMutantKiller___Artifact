import { Q } from "./q";

describe("Q unhandled rejection tracking", () => {
  it("should emit unhandledRejection event when promise is rejected without handler", (done) => {
    // Setup event listener
    const listener = (reason: any, promise: any) => {
      // Clean up listener
      process.removeListener("unhandledRejection", listener);

      // Verify the event was emitted with correct arguments
      expect(reason).toBe("test rejection");
      expect(Q.isPromise(promise)).toBe(true);
      expect(promise.isRejected()).toBe(true);

      // Add a handler to prevent process exit
      promise.catch(() => {});

      done();
    };

    process.on("unhandledRejection", listener);

    // Create and reject a promise without attaching a handler
    const rejectedPromise = Q.reject("test rejection");

    // Give event loop time to process
    setTimeout(() => {
      // If we get here without the listener being called, the test should fail
      process.removeListener("unhandledRejection", listener);
      done(new Error("unhandledRejection event was not emitted"));
    }, 100);
  });
});