import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise fallback behavior", () => {
  it("should use fallback function when dispatching an unsupported operation", async () => {
    // Create a promise with a descriptor that only handles "when" operation
    // and a fallback that handles other operations
    const fallbackResult = "fallback_was_called";
    
    const customPromise = Q.makePromise(
      {
        "when": function() {
          return "when_result";
        }
      },
      function fallback(op: string, args: any[]) {
        // This fallback should be called for unsupported operations
        return fallbackResult;
      },
      function inspect() {
        return { state: "fulfilled", value: fallbackResult };
      }
    );

    // Dispatch an operation that is not in the descriptor ("get")
    // In the original code, this calls fallback.call(promise, op, args)
    // In the mutated code, result remains undefined
    const result = await Q(customPromise).dispatch("get", ["someKey"]);
    
    expect(result).toBe(fallbackResult);
  });
});