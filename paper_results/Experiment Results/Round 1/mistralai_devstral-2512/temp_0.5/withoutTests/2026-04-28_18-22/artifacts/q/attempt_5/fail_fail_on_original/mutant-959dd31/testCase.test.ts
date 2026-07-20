// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.timeout", () => {
  it("should reject with the provided string error when timeout occurs", (done) => {
    const customError = "Timeout occurred";
    const promise = Q.delay(100).timeout(50, customError);

    // Add a timeout to the test to prevent hanging
    const testTimeout = setTimeout(() => {
      done(new Error("Test timed out"));
    }, 1000);

    promise.then(
      () => {
        clearTimeout(testTimeout);
        done(new Error("Promise should have been rejected"));
      },
      (error: string) => {
        clearTimeout(testTimeout);
        expect(error).toBe(customError);
        done();
      }
    );
  }, 1500);
});