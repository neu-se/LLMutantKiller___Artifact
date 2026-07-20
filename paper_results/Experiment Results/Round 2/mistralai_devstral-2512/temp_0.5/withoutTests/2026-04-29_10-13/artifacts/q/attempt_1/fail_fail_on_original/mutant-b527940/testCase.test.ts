import { Q } from "./q.js";

describe("Q unhandled rejection tracking", () => {
  it("should emit unhandledRejection event when promise is rejected without handler", (done) => {
    // Create a promise that will be rejected
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Listen for the unhandledRejection event
    process.once("unhandledRejection", (reason, promise) => {
      expect(reason).toBeInstanceOf(Error);
      expect((reason as Error).message).toBe("Test error");
      expect(promise).toBe(rejectedPromise);
      done();
    });

    // Force the event loop to process the rejection
    setTimeout(() => {}, 10);
  });
});