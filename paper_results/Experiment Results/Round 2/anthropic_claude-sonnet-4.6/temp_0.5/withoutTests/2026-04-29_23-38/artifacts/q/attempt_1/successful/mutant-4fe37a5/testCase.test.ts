import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise fallback behavior for unsupported operations", () => {
  it("should reject with an error when a promise is dispatched with an unsupported operation", async () => {
    // Create a promise using Q.makePromise without providing a fallback
    // In the original code, a default fallback is provided that rejects with an error
    // In the mutated code, the fallback remains undefined, causing a TypeError when called
    const promise = Q.makePromise({
      "when": function () {
        return 42;
      }
    });

    // Dispatch an unsupported operation - this should trigger the fallback
    // In original: fallback rejects with "Promise does not support operation: someUnsupportedOp"
    // In mutated: fallback is undefined, so calling it throws a TypeError
    let result: any;
    let error: any;

    try {
      result = await promise.dispatch("someUnsupportedOp", []);
    } catch (e) {
      error = e;
    }

    // In the original code, the promise should be rejected with a meaningful error message
    expect(error).toBeDefined();
    expect(error.message).toContain("Promise does not support operation: someUnsupportedOp");
  });
});