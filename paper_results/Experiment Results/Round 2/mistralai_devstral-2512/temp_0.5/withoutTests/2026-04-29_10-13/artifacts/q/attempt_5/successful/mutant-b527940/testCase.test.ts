const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should properly track and emit unhandled rejections", (done) => {
    // Reset any previous unhandled rejections
    Q.resetUnhandledRejections();

    // Create multiple rejected promises
    const promise1 = Q.reject(new Error("Error 1"));
    const promise2 = Q.reject(new Error("Error 2"));

    // Track how many unhandled rejection events we receive
    let eventCount = 0;
    const listener = (reason: any, promise: any) => {
      eventCount++;
      if (eventCount === 2) {
        process.off("unhandledRejection", listener);
        // Verify both rejections were tracked
        const unhandled = Q.getUnhandledReasons();
        expect(unhandled.length).toBe(2);
        done();
      }
    };

    process.on("unhandledRejection", listener);

    // Force event loop to process
    setTimeout(() => {}, 10);
  });
});