const q = require("../../../../../../subject_repositories/q/q.js");

describe("Q", () => {
  it("should export Q when typeof exports === 'object' and typeof module === 'object'", () => {
    // Create a mock environment where typeof exports === "object" and typeof module === "object"
    const originalExports = global.exports;
    const originalModule = global.module;
    global.exports = {};
    global.module = { exports: {} };

    q();

    expect(global.module.exports).toBeDefined();

    // Restore the original environment
    global.exports = originalExports;
    global.module = originalModule;
  });

  it("should not export Q when typeof exports === 'object' and typeof module !== 'object'", () => {
    // Create a mock environment where typeof exports === "object" but typeof module !== "object"
    const originalExports = global.exports;
    const originalModule = global.module;
    global.exports = {};
    global.module = undefined;

    q();

    expect(global.Q).toBeUndefined();

    // Restore the original environment
    global.exports = originalExports;
    global.module = originalModule;
  });
});