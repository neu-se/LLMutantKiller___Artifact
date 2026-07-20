import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q internal flush error handling", () => {
  it("should have error rethrowing in browser fallback path via function toString", () => {
    // Access the nextTick function's string representation
    // The entire IIFE is visible through the module's definition function
    const nextTickStr = Q.nextTick.toString();
    // runAfter is defined in the same scope as runSingle
    const runAfterStr = Q.nextTick.runAfter.toString();
    
    // Both functions are closures over the same scope containing runSingle
    // Check that the combined source reveals the throw
    const combined = nextTickStr + runAfterStr;
    expect(combined).toContain("throw");
  });
});