import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection stores reason.stack for errors with stacks", () => {
  it("should store the stack trace string in unhandledReasons when rejecting with an Error", async () => {
    Q.resetUnhandledRejections();

    const error = new Error("test rejection error");
    // Ensure the error has a stack
    expect(typeof error.stack).toBe("string");

    Q.reject(error);

    // Wait for async operations to settle
    await new Promise<void>((resolve) => {
      Q.nextTick(resolve);
    });

    const reasons = Q.getUnhandledReasons();
    expect(reasons.length).toBeGreaterThan(0);

    // In the original code, reason.stack is stored (a string containing stack trace info)
    // In the mutated code, "(no stack) " + reason is stored instead
    const storedReason = reasons[0];

    // The original stores reason.stack which is a string like "Error: test rejection error\n    at ..."
    // The mutated stores "(no stack) Error: test rejection error" (using toString())
    // So we check that the stored reason does NOT start with "(no stack) "
    expect(storedReason).not.toMatch(/^\(no stack\)/);

    // Additionally verify it contains the actual stack trace content
    // (stack traces contain "at " for call frames)
    expect(storedReason).toContain("Error: test rejection error");
  });
});