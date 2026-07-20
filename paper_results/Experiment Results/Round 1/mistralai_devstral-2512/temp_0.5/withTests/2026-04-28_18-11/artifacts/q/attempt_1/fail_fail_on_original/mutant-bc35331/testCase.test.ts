// Test to detect the mutation in q.js where process.toString() === "[object process]" is changed to process.toString() === ""
import { Q } from "./q.js";

describe("Node environment detection", () => {
  it("should correctly identify Node.js environment", () => {
    // This test verifies that Q correctly detects a Node.js environment
    // by checking if process.nextTick is used for scheduling
    const originalProcess = global.process;
    const mockProcess = {
      nextTick: (callback: Function) => callback(),
      toString: () => "[object process]"
    };

    // Replace global process with our mock
    global.process = mockProcess as any;

    // Create a promise and verify it resolves correctly in Node environment
    let resolved = false;
    Q.resolve("test").then(value => {
      resolved = true;
      expect(value).toBe("test");
    });

    // Restore original process
    global.process = originalProcess;

    // The test should pass in original code (Node env detected) but fail in mutated code (Node env not detected)
    expect(resolved).toBe(true);
  });
});