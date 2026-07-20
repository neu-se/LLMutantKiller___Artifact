const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise inspection", () => {
  it("should correctly report pending state for new promises", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The mutation changes the condition from `if (messages)` to `if (true)`
    // This affects the valueOf behavior which is called during inspection
    const state = promise.inspect().state;

    // In original code, pending promises should report "pending" state
    // In mutated code, the valueOf behavior changes which could affect inspection
    expect(state).toBe("pending");
  });
});