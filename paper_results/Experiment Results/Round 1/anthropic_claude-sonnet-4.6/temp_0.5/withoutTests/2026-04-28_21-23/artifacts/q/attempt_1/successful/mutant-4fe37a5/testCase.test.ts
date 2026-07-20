import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise fallback behavior", () => {
  it("should reject with an error when an unsupported operation is dispatched on a promise created without a fallback", async () => {
    // Create a promise using Q.makePromise with only a descriptor (no fallback)
    // In the original code, a default fallback is set that rejects with an error
    // In the mutated code, the fallback remains undefined, causing a crash
    const promise = Q.makePromise({
      "when": function () {
        return "fulfilled";
      }
    });

    // Dispatch an operation that is not in the descriptor
    // This should trigger the fallback
    const result = await promise.dispatch("get", ["someKey"]).then(
      (value: any) => ({ success: true, value }),
      (error: any) => ({ success: false, error })
    );

    // In the original code, the fallback rejects with "Promise does not support operation: get"
    expect(result.success).toBe(false);
    expect(result.error).toBeInstanceOf(Error);
    expect(result.error.message).toContain("Promise does not support operation: get");
  });
});