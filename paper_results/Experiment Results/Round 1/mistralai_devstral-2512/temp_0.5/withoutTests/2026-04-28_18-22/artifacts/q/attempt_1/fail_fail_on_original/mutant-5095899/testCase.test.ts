// Test to detect the mutation in q.js
import { Q } from "./q.js";

describe("Q library global object detection", () => {
  it("should expose Q as a global when window is undefined but self is defined", () => {
    // Save the original global objects
    const originalWindow = global.window;
    const originalSelf = global.self;
    const originalQ = global.Q;

    // Delete any existing Q global and set up the test environment
    delete global.Q;
    global.window = undefined;
    global.self = { Q: undefined };

    // Load Q in the test environment
    // This simulates the scenario where window is undefined but self is defined
    // The original code should expose Q as a global in this case
    // The mutated code should not (due to the changed condition)
    require("./q.js");

    // Verify that Q was exposed as a global
    expect(global.self.Q).toBeDefined();
    expect(typeof global.self.Q).toBe("function");

    // Clean up
    global.window = originalWindow;
    global.self = originalSelf;
    global.Q = originalQ;
  });
});