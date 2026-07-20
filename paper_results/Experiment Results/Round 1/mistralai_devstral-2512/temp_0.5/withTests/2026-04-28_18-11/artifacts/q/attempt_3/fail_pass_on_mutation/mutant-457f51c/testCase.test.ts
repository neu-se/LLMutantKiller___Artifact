import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior on rejected promises", () => {
  it("should not expose exception property for fulfilled promises", () => {
    const fulfilledPromise = Q(42);

    // The mutation changes the condition from checking the state to always true
    // This test verifies that the exception property is not incorrectly exposed on fulfilled promises
    expect(fulfilledPromise.exception).toBeUndefined();
  });
});