import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise valueOf behavior", () => {
  it("should return the promise itself when rejected", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.reject(new Error("test error"));

    // The mutation changes the condition from checking the state to always true
    // This test verifies that valueOf returns the promise when rejected
    expect(promise.valueOf()).toBe(promise);
  });
});