const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should maintain unhandled rejection state when tracking is disabled", () => {
    // Disable tracking first
    Q.stopUnhandledRejectionTracking();

    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Manually add a reason to simulate internal state
    const reasonsBefore = Q.getUnhandledReasons();
    reasonsBefore.push("Test reason");

    // Call resetUnhandledRejections when tracking is disabled
    Q.resetUnhandledRejections();

    // In original code: should keep the array unchanged (early return)
    // In mutated code: would clear the array (incorrect behavior)
    expect(Q.getUnhandledReasons()).toEqual(expect.arrayContaining(["Test reason"]));
  });
});