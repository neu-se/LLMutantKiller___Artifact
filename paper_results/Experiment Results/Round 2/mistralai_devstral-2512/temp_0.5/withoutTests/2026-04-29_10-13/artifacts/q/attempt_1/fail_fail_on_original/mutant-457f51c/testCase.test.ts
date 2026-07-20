import { Q } from "./q";

describe("Q promise valueOf behavior", () => {
  it("should not expose exception property for pending promises", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The promise is pending, so valueOf should return the promise itself
    // and should not have an exception property
    expect(promise.valueOf()).toBe(promise);
    expect(promise).not.toHaveProperty("exception");

    // Now reject the promise
    const error = new Error("test error");
    deferred.reject(error);

    // After rejection, the promise should still not expose the exception
    // through valueOf (which should return the promise itself for rejected state)
    expect(promise.valueOf()).toBe(promise);
  });
});