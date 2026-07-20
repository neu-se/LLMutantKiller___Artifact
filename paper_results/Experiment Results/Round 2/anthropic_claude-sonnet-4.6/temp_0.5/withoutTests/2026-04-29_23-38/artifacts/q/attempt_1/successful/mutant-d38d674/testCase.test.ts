import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.makePromise fallback behavior", () => {
  it("should use default fallback when no fallback is provided and an unsupported operation is dispatched", async () => {
    // Create a promise with only a descriptor (no fallback)
    // In the original code: fallback === void 0, so default fallback is set
    // In the mutated code: fallback !== void 0 is false, so default fallback is NOT set
    // This means dispatching an unsupported operation will throw/fail differently
    
    const descriptor = {
      "when": function() {
        return "fulfilled";
      }
    };
    
    // Create a promise without a fallback - only descriptor and inspect
    const customPromise = Q.makePromise(descriptor, void 0, function inspect() {
      return { state: "fulfilled", value: 42 };
    });
    
    // Dispatch an unsupported operation (not in descriptor)
    // In original: default fallback returns a rejection with "Promise does not support operation: get"
    // In mutated: fallback is undefined, calling fallback() will throw TypeError
    const result = await Q(customPromise).dispatch("get", ["someKey"]).then(
      function(value) { return { success: true, value: value }; },
      function(err) { return { success: false, error: err.message }; }
    );
    
    // In original code: should get a rejection with the "does not support operation" message
    expect(result.success).toBe(false);
    expect(result.error).toContain("Promise does not support operation: get");
  });
});