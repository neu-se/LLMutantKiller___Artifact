import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.makePromise fallback behavior", () => {
  it("should return a rejected promise when an unsupported operation is called on a promise created without a fallback", async () => {
    // Create a promise using Q.makePromise (which is the Promise constructor)
    // without providing a fallback function
    const customPromise = Q.makePromise({
      "when": function () {
        return 42;
      }
    }, void 0, function inspect() {
      return { state: "fulfilled", value: 42 };
    });

    // In the original code, calling an unsupported operation (not in descriptor)
    // should return a rejected promise because the default fallback is set
    // In the mutated code, fallback remains undefined, causing a TypeError when called
    const result = Q(customPromise).dispatch("unsupportedOperation", []);
    
    let caughtReason: any = null;
    let resolved = false;
    
    await result.then(
      () => { resolved = true; },
      (reason: any) => { caughtReason = reason; }
    );
    
    // Original: should reject with "Promise does not support operation: unsupportedOperation"
    // Mutated: would either throw synchronously or reject with TypeError
    expect(resolved).toBe(false);
    expect(caughtReason).not.toBeNull();
    expect(caughtReason.message).toContain("Promise does not support operation: unsupportedOperation");
  });
});