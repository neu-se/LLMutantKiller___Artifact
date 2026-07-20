import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.makePromise fallback behavior", () => {
  it("should return a rejected promise when an unsupported operation is dispatched on a promise created without a fallback", async () => {
    // Create a promise with only a "when" descriptor and no fallback
    const promise = Q.makePromise({
      when: function () {
        return "value";
      }
    });

    // Dispatch an unsupported operation - without fallback this should return a rejected promise
    const result = promise.dispatch("get", ["someProperty"]);

    // The result should be a rejected promise with a meaningful error message
    let caught: Error | null = null;
    await result.then(
      () => {
        throw new Error("Expected rejection but got fulfillment");
      },
      (err: Error) => {
        caught = err;
      }
    );

    expect(caught).not.toBeNull();
    expect(caught!.message).toContain("Promise does not support operation");
  });
});