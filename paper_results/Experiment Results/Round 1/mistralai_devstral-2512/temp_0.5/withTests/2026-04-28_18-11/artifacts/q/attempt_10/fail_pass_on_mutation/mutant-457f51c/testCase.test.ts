import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf exception handling", () => {
  it("should not expose exception through valueOf for fulfilled promises", () => {
    // Create a fulfilled promise
    const fulfilledPromise = Q(42);

    // The valueOf method is deprecated but still exists in the code
    // The mutation changes the condition that sets the exception property
    // We need to test the actual behavior that would be affected

    // Get the inspect result which shows the internal state
    const inspectResult = fulfilledPromise.inspect();

    // For fulfilled promises, state should be "fulfilled"
    expect(inspectResult.state).toBe("fulfilled");

    // The exception property should not be set for fulfilled promises
    // In the original code, this is protected by checking the state
    // In the mutated code (if true), it would incorrectly set exception
    expect(fulfilledPromise.exception).toBeUndefined();
  });
});