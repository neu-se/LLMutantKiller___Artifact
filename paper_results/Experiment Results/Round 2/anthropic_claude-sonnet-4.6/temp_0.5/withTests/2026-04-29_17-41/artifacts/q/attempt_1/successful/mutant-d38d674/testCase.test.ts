import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.makePromise fallback behavior", () => {
  it("should use the provided fallback function when one is given, not the default", async () => {
    const customFallbackResult = "custom fallback was called";
    
    // Create a promise with a custom fallback that returns a specific value
    const promise = Q.makePromise(
      {
        // descriptor with no "when" handler for unsupported ops
      },
      function customFallback(op: string) {
        // Return a fulfilled promise with our custom result
        return Q(customFallbackResult);
      },
      function inspect() {
        return { state: "fulfilled", value: "test" };
      }
    );

    // Dispatch an operation not in the descriptor to trigger the fallback
    const result = await Q.when(promise.dispatch("someUnsupportedOperation", []));
    
    // With original code: fallback is undefined check passes (fallback is provided),
    // so custom fallback is used -> result is customFallbackResult
    // With mutated code: fallback !== void 0 check passes (fallback is provided),
    // so the default fallback is SET, overwriting our custom one -> result is a rejection
    expect(result).toBe(customFallbackResult);
  });
});