import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise fallback behavior", () => {
  it("should call the fallback function when the operation is not in the descriptor", async () => {
    const fallbackResult = "fallback-was-called";
    
    const customPromise = Q.makePromise(
      {
        // Only 'when' is defined, not 'get'
        "when": function() {
          return "when-result";
        }
      },
      function fallback(op, args) {
        // This fallback should be called for 'get' operation
        return fallbackResult;
      },
      function inspect() {
        return { state: "fulfilled", value: "test" };
      }
    );

    // Dispatch 'get' which is NOT in the descriptor, so fallback should be called
    const result = await customPromise.dispatch("get", ["someKey"]);
    
    // With original code: fallback is called, result = "fallback-was-called"
    // With mutated code: fallback is NOT called, result = undefined
    expect(result).toBe(fallbackResult);
  });
});