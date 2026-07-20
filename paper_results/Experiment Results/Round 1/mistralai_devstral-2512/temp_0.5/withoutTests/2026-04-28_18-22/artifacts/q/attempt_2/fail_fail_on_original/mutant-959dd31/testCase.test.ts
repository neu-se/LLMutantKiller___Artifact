// testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.timeout", () => {
  it("should reject with the provided error when timeout occurs", (done) => {
    const customError = new Error("Custom timeout error");
    const promise = Q.delay(100).timeout(50, customError);

    promise.then(
      () => {
        done(new Error("Promise should have been rejected"));
      },
      (error: Error) => {
        expect(error).toBe(customError);
        done();
      }
    );
  });
});