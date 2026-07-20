// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.timeout", () => {
  it("should reject with the provided string error when timeout occurs", () => {
    const customError = "Timeout occurred";
    const promise = Q.delay(100).timeout(50, customError);

    return promise.then(
      () => {
        throw new Error("Promise should have been rejected");
      },
      (error: Error) => {
        expect(error.message).toBe(customError);
      }
    );
  });
});