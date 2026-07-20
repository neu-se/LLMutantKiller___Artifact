import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection stores reason.stack when reason has a stack", () => {
  it("should store the stack trace string in unhandledReasons when rejecting with an Error", async () => {
    // Reset any existing unhandled rejections
    Q.resetUnhandledRejections();

    const error = new Error("test rejection error");
    
    // Create a rejected promise - this triggers trackRejection internally
    Q.reject(error);

    // Wait for async operations to settle
    await new Promise<void>((resolve) => setTimeout(resolve, 50));

    const reasons = Q.getUnhandledReasons();
    
    // In the original code, reason.stack is pushed when reason has a stack
    // In the mutated code, the if(false) branch means it always pushes "(no stack) " + reason
    expect(reasons.length).toBeGreaterThan(0);
    
    // The original stores reason.stack (which contains "Error: test rejection error")
    // The mutation stores "(no stack) Error: test rejection error"
    const firstReason = reasons[0];
    expect(firstReason).not.toMatch(/^\(no stack\)/);
    expect(firstReason).toContain("test rejection error");
  });
});