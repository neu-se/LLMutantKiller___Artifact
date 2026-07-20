const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library Node.js environment detection", () => {
  it("should correctly detect Node.js environment and use process.nextTick", (done) => {
    // The mutation changes the Node.js detection from checking process.toString()
    // to always true, which could affect behavior in non-Node environments
    // We test this by verifying the order of execution in a Node.js environment

    let executionOrder = [];

    // Use Q.nextTick which should use process.nextTick in Node.js
    Q.nextTick(() => {
      executionOrder.push(2);
    });

    executionOrder.push(1);

    // Use setImmediate to check after the next tick
    setImmediate(() => {
      // In original code with proper Node.js detection, order should be [1, 2]
      // The mutation shouldn't affect this in a real Node.js environment
      // but we can detect it by checking if Q.nextTick behaves correctly
      expect(executionOrder).toEqual([1, 2]);

      // Additional check: verify Q.nextTick is actually using process.nextTick
      const originalNextTick = process.nextTick;
      let nextTickCalled = false;
      process.nextTick = function(callback) {
        nextTickCalled = true;
        return originalNextTick.call(this, callback);
      };

      Q.nextTick(() => {
        process.nextTick = originalNextTick;
        expect(nextTickCalled).toBe(true);
        done();
      });
    });
  });
});