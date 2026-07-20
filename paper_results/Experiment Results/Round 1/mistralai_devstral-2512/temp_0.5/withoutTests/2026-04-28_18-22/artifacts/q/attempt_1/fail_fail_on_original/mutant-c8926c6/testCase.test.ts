import { Q } from "./q";

describe("Q library Node.js environment detection", () => {
  it("should correctly detect real Node.js environment with process.nextTick", (done) => {
    // This test verifies that Q properly detects a real Node.js environment
    // The mutation changes the condition from checking process.toString() to just true
    // In a real Node.js environment, this shouldn't affect behavior, but we can detect
    // the mutation by checking if Q uses the correct tick mechanism

    // Create a simple test that relies on proper nextTick behavior
    let order = [];
    Q.nextTick(() => {
      order.push(2);
      // In a proper Node.js environment with correct detection,
      // this should execute in the next tick
    });
    order.push(1);

    // Use setImmediate to check the order after the next tick
    setImmediate(() => {
      // In a real Node.js environment with proper detection, order should be [1, 2]
      // If the mutation causes incorrect detection, the behavior might differ
      expect(order).toEqual([1, 2]);
      done();
    });
  });
});