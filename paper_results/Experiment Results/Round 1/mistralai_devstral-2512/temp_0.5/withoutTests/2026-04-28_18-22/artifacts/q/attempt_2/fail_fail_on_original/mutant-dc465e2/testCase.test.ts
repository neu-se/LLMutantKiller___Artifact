import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.timeout", () => {
  it("should resolve with the original value when the promise resolves before timeout", (done) => {
    const deferred = Q.defer();
    const testValue = "test";

    // Set up a timeout that resolves after 50ms
    setTimeout(() => {
      deferred.resolve(testValue);
    }, 50);

    // Apply a timeout of 100ms (longer than the resolution time)
    const promiseWithTimeout = deferred.promise.timeout(100);

    promiseWithTimeout.then(
      (value: any) => {
        expect(value).toBe(testValue);
        done();
      },
      (error: any) => {
        done.fail("Promise should have resolved, not rejected: " + error);
      }
    );
  });
});