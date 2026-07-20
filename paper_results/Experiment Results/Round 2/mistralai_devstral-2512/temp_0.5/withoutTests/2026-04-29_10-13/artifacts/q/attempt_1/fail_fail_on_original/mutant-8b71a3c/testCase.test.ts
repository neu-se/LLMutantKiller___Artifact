import { Q } from "./q.js";

describe("Q promise valueOf behavior", () => {
  it("should return the promise itself when state is pending", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    // The promise is initially pending
    expect(promise.valueOf()).toBe(promise);
  });
});