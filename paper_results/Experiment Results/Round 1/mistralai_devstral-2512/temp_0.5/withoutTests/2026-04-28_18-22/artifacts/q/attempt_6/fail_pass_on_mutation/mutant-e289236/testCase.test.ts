import { defer } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q deferred promise valueOf behavior", () => {
  it("should correctly implement valueOf for pending promises", () => {
    const deferred = defer();
    const promise = deferred.promise;

    // The mutation changes the condition from `if (messages)` to `if (true)`
    // which would make messages undefined immediately, affecting valueOf behavior
    const valueOfResult = promise.valueOf();

    // For pending promises, valueOf should return the promise itself
    expect(valueOfResult).toBe(promise);
  });
});