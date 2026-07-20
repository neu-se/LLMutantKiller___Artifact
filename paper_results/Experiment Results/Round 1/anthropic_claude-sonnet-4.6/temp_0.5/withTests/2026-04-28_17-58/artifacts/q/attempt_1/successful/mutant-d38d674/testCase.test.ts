import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.makePromise fallback behavior", () => {
  it("should use the provided fallback function instead of the default when fallback is given", async () => {
    // Create a promise with a custom fallback that returns a specific value
    // for unsupported operations
    const customFallbackValue = "custom-fallback-result";
    const promise = Q.makePromise(
      {}, // empty descriptor - no operations defined
      function customFallback(op: string) {
        return customFallbackValue;
      },
      function inspect() {
        return { state: "fulfilled", value: "test" };
      }
    );

    // Dispatch an operation not in the descriptor - should use the fallback
    const result = await Q.when(promise.dispatch("someUnsupportedOp", []));
    
    // With original code: fallback is NOT void 0, so the condition `fallback === void 0` is false,
    // meaning the custom fallback is kept and returns "custom-fallback-result"
    //
    // With mutated code: fallback is NOT void 0, so the condition `fallback !== void 0` is true,
    // meaning the custom fallback is REPLACED with the default fallback that rejects with an Error
    expect(result).toBe(customFallbackValue);
  });
});