import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.timeout", () => {
  it("should reject with custom error when timeout occurs", (done) => {
    const customError = new Error("Custom timeout error");
    const deferred = Q.defer();
    const promise = deferred.promise.timeout(10, customError);

    // Let the timeout trigger
    setTimeout(() => {
      promise.then(
        () => done(new Error("Promise should have been rejected")),
        (error: Error) => {
          expect(error).toBe(customError);
          done();
        }
      );
    }, 20);
  });
});