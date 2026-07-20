import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should export Q as a function when used in a CommonJS environment", () => {
    // Create a mock environment where typeof exports === "object" and typeof module === "object"
    const originalExports = global.exports;
    const originalModule = global.module;
    global.exports = {};
    global.module = { exports: {} };

    const qInstance = Q();
    expect(qInstance).not.toBeNull();

    // Check if Q is exported correctly
    expect(global.module.exports).toBe(qInstance);

    // Restore the original environment
    global.exports = originalExports;
    global.module = originalModule;
  });
});