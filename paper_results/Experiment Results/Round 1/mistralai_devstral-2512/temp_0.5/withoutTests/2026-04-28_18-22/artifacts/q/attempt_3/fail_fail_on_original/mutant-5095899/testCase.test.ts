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

    // Verify that Q was exposed as a global on self
    expect((global as any).self.Q).toBeDefined();
    expect(typeof (global as any).self.Q).toBe("function");

    // Verify the Q instance works correctly
    const deferred = (global as any).self.Q.defer();
    expect(deferred).toBeDefined();
    expect(typeof deferred.resolve).toBe("function");
    expect(typeof deferred.reject).toBe("function");

    // Clean up
    (global as any).window = originalWindow;
    (global as any).self = originalSelf;
    (global as any).Q = originalQ;
  });
});