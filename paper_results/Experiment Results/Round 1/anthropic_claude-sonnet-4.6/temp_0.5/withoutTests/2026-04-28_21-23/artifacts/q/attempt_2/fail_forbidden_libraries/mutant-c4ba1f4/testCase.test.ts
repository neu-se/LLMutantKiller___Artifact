import { jest } from "@jest/globals";

describe("Q setImmediate branch for requestTick", () => {
  it("should use setImmediate as requestTick when setImmediate exists but process is not real Node.js", (done) => {
    jest.resetModules();

    const originalProcess = global.process;

    // Simulate a non-Node.js environment that has setImmediate (e.g., IE10 with polyfill)
    // by making process.toString() not return "[object process]"
    (global as any).process = {
      toString: () => "[object Object]",
      env: {},
    };

    let Q: any;
    try {
      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      global.process = originalProcess;
    }

    // In original code: requestTick = function() { setImmediate(flush); }
    // In mutated code: requestTick is never set (undefined), so calling nextTick will throw

    let taskExecuted = false;

    expect(() => {
      Q.nextTick(() => {
        taskExecuted = true;
      });
    }).not.toThrow();

    setImmediate(() => {
      setImmediate(() => {
        expect(taskExecuted).toBe(true);
        done();
      });
    });
  });
});