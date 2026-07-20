// Test to detect the mutation in q.js
declare const Q: any;

describe("Q library global object detection", () => {
  it("should expose Q as a global when window is undefined but self is defined", () => {
    // Save the original global objects
    const originalWindow = (global as any).window;
    const originalSelf = (global as any).self;
    const originalQ = (global as any).Q;

    // Delete any existing Q global and set up the test environment
    delete (global as any).Q;
    (global as any).window = undefined;
    (global as any).self = {};

    // Load Q in the test environment by evaluating the module code
    // This simulates the scenario where window is undefined but self is defined
    // The original code should expose Q as a global in this case
    // The mutated code should not (due to the changed condition)
    const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Check if Q was exposed as a global on self
    const qOnSelf = (global as any).self.Q;
    const qOnGlobal = (global as any).Q;

    // The original code should expose Q on self when window is undefined but self is defined
    // The mutated code will fail to do this due to the logical error in the condition
    expect(qOnSelf).toBeDefined();
    expect(typeof qOnSelf).toBe("function");

    // Also verify it's available on global
    expect(qOnGlobal).toBeDefined();
    expect(typeof qOnGlobal).toBe("function");

    // Verify they are the same instance
    expect(qOnSelf).toBe(qOnGlobal);

    // Clean up
    (global as any).window = originalWindow;
    (global as any).self = originalSelf;
    (global as any).Q = originalQ;
  });
});