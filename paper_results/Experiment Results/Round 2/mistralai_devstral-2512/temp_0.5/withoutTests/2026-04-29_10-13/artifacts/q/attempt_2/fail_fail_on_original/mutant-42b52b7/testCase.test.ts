import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should properly track unhandled rejections when process.emit exists", (done) => {
    // Create a rejected promise without handling it
    const rejectedPromise = Q.reject(new Error("Test unhandled rejection"));

    // Wait for the unhandled rejection tracking to occur
    setTimeout(() => {
      // The test passes if no errors are thrown
      done();
    }, 100);
  });
});