const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should emit unhandledRejection event when promise is rejected without handler", (done) => {
    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Listen for unhandledRejection event
    const listener = (reason: any, promise: any) => {
      expect(reason.message).toBe("Test error");
      expect(promise).toBe(rejectedPromise);
      process.off("unhandledRejection", listener);
      done();
    };

    process.on("unhandledRejection", listener);

    // Force event loop to process
    setTimeout(() => {}, 10);
  });
});