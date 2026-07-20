import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise fallback behavior", () => {
  it("should reject with an error message when an unsupported operation is dispatched on a promise without a fallback", async () => {
    const promise = Q.makePromise({
      "when": function () {
        return "handled";
      }
    });

    // Dispatch an operation that is not in the descriptor and has no fallback
    // In the original code, fallback defaults to a function that rejects with
    // "Promise does not support operation: <op>"
    // In the mutated code, fallback remains undefined, causing a TypeError when called
    const result = await new Promise<{ state: string; reason?: any }>((resolve) => {
      promise.dispatch("get", ["someKey"]).then(
        () => resolve({ state: "fulfilled" }),
        (err: any) => resolve({ state: "rejected", reason: err })
      );
    });

    expect(result.state).toBe("rejected");
    expect(result.reason).toBeInstanceOf(Error);
    expect(result.reason.message).toContain("Promise does not support operation: get");
  });
});